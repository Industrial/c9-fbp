import * as A from 'fp-ts/Array.ts'
import * as E from 'fp-ts/Either.ts'
import * as IO from 'fp-ts/IO.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as handlers from '#/handlers/mod.ts'
import * as json from 'fp-ts/Json.ts'
import { Const } from 'fp-ts/Const.ts'
import { InputMessage, InputMessageInput, InputMessageTranscoder } from '#/schemas/messages/InputMessage.ts'
import { OutputMessage, OutputMessageInput, OutputMessageTranscoder } from '#/schemas/messages/OutputMessage.ts'
import { TranscodeErrors } from 'schemata-ts/TranscodeError'
import { pipe } from 'fp-ts/function.ts'

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

  const socketSend = (outputMessageString: string): IO.IO<void> => {
    return () => {
      socket.send(outputMessageString)
    }
  }

  const getOutputMessagesForInputMessage = (
    inputMessage: InputMessage,
  ): TE.TaskEither<Error, Array<OutputMessageInput>> => {
    // console.log('inputMessage', inputMessage)
    const protocolHandlers = handlers[inputMessage.protocol as keyof typeof handlers]
    // console.log('protocolHandlers', protocolHandlers)
    const handler = protocolHandlers[inputMessage.command as keyof typeof protocolHandlers] as (
      input: InputMessage,
    ) => TE.TaskEither<Error, Array<OutputMessageInput>>
    // console.log('handler', handler)
    const outputMessageInputs = handler(inputMessage)
    // console.log('outputMessageInputs', outputMessageInputs)
    return outputMessageInputs
  }

  // socket.addEventListener('error', (event) => {
  //   console.log(event)
  // })

  socket.addEventListener('message', (event: MessageEvent<string>) => {
    pipe(
      event.data,
      json.parse,
      E.map((inputMessageInput) => {
        return pipe(
          InputMessageTranscoder.decode(inputMessageInput) as E.Either<
            Const<TranscodeErrors, InputMessageInput>,
            InputMessage
          >,
          E.mapLeft((error) => {
            return {
              inputMessageInput,
              error,
            }
          }),
        )
      }),
      E.flatten,
      TE.fromEitherK(E.map((x) => {
        return x
      })),
      TE.map(getOutputMessagesForInputMessage),
      TE.flatten,
      TE.map((outputMessageInputs) => {
        return pipe(
          outputMessageInputs,
          A.map((outputMessageInput) => {
            return pipe(
              OutputMessageTranscoder.decode(outputMessageInput) as E.Either<
                Const<TranscodeErrors, OutputMessageInput>,
                OutputMessage
              >,
              E.mapLeft((error) => {
                return {
                  outputMessageInput,
                  error,
                }
              }),
            )
          }),
          TE.fromEitherK(E.sequenceArray),
        )
      }),
      TE.flatten,
      TE.map((outputMessages) => {
        // console.log('outputMessages', outputMessages)
        return pipe(
          outputMessages,
          RA.map(json.stringify),
          E.sequenceArray,
          TE.fromEitherK(E.map((outputMessageStrings) => {
            return pipe(
              outputMessageStrings,
              RA.map((outputMessageString) => {
                // console.log('outputMessageString', outputMessageString)
                socketSend(outputMessageString)()
              }),
            )
          })),
        )
      }),
      TE.flatten,
      TE.match(
        (error) => {
          logError(error as Error)
        },
        () => {
        },
      ),
    )()
  })

  return response
})
