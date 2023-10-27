// import * as base64 from 'std/encoding/base64.ts'

import * as E from 'fp-ts/Either.ts'
import * as handlers from '#/handlers/mod.ts'
import { InputMessage, InputMessageTranscoder } from '#/schemas/messages/InputMessage.ts'
import { OutputMessageTranscoder } from '#/schemas/messages/OutputMessage.ts'

const config = JSON.parse(await Deno.readTextFile('./fbp-config.json'))

const hostname = config.host as string
const port = config.port as number

const logError = (error: Error) => {
  const errorMessage = Deno.inspect(error, {
    colors: true,
    breakLength: 80,
    iterableLimit: 100,
    showHidden: false,
    strAbbreviateSize: undefined,
    compact: false,
    escapeSequences: true,
    getters: true,
    showProxy: true,
    sorted: true,
    trailingComma: true,
    depth: Infinity,
  })
  console.error(errorMessage)
}

Deno.serve({
  hostname,
  port,
}, (req) => {
  if (req.headers.get('upgrade') != 'websocket') {
    return new Response(null, {
      status: 501,
    })
  }

  // const secWebsocketKey = req.headers.get('Sec-Websocket-Key')
  const secWebsocketProtocol = req.headers.get('Sec-Websocket-Protocol')
  // const secWebsocketVersion = req.headers.get('Sec-Websocket-Version')
  // const secWebsocketAccept = base64.encodeBase64(`${secWebsocketKey}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)

  const { socket, response } = Deno.upgradeWebSocket(req, {
    protocol: secWebsocketProtocol ?? '',
    // idleTimeout: 1,
  })

  socket.addEventListener('open', () => {
    console.log('a client connected!')
  })

  socket.addEventListener('message', async (event) => {
    try {
      const inputMessage = JSON.parse(event.data) as Array<unknown> | Record<string, unknown>

      const inputDecodeResult = InputMessageTranscoder.decode(inputMessage)
      if (E.isLeft(inputDecodeResult)) {
        throw {
          inputMessage,
          transcodeErrors: inputDecodeResult.left,
        }
      }

      // TODO: Can't really get these types as literals. Why?
      const inputMessageResult = inputDecodeResult.right as InputMessage
      const protocolHandlers = handlers[inputMessageResult.protocol as keyof typeof handlers]
      const commandHandler = protocolHandlers[inputMessageResult.command as keyof typeof protocolHandlers]
      const outputMessages = await commandHandler(inputMessageResult as never)

      // const outputEncodeResults = []
      for (const entry of outputMessages) {
        const result = OutputMessageTranscoder.encode(entry as never)
        if (E.isLeft(result)) {
          throw {
            outputMessage: entry,
            transcodeErrors: result.left,
          }
        }

        // TODO: Check if you can send multiple messages at once.
        socket.send(JSON.stringify(result.right))
      }
    } catch (error: unknown) {
      logError(error as Error)
    }
  })

  return response
})
