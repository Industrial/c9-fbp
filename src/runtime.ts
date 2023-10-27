// import * as base64 from 'std/encoding/base64.ts'

import { InputMessageTranscoder } from '#/schemas/messages/InputMessage.ts'

const config = JSON.parse(await Deno.readTextFile('./fbp-config.json'))

const hostname = config.host as string
const port = config.port as number

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

  socket.addEventListener('message', (event) => {
    // console.log('message', event)

    try {
      const inputMessage = JSON.parse(event.data)
      const decodedInputMessage = InputMessageTranscoder.decode(inputMessage)
      console.log('decodedInputMessage', decodedInputMessage)

      socket.send(
        JSON.stringify({
          protocol: 'secWebsocketProtocol',
          payload: {},
        }),
      )
    } catch (error: unknown) {
      // TODO: Return correct error to client?
      console.error(error as Error)
    }

    // if (event.data === 'ping') {
    //   socket.send('pong')
    // }
  })

  return response

  // return new Response(response.body, {
  //   headers: new Headers({
  //     ...response.headers,
  //     'Sec-Websocket-Accept': secWebsocketAccept,
  //   }),
  //   status: response.status,
  //   statusText: response.statusText,
  // })
})
