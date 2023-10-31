import * as A from 'fp-ts/Array.ts'
import * as E from 'fp-ts/Either.ts'
import * as IO from 'fp-ts/IO.ts'
import * as R from 'fp-ts/Record.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as json from 'fp-ts/Json.ts'
import { Const } from 'fp-ts/Const.ts'
import { ErrorOutputMessage } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Handler } from '#/handlers/Handler.ts'
import { InputMessage, InputMessageInput, InputMessageTranscoder } from '#/schemas/messages/InputMessage.ts'
import { OutputMessage, OutputMessageInput, OutputMessageTranscoder } from '#/schemas/messages/OutputMessage.ts'
import { TranscodeErrors } from 'schemata-ts/TranscodeError'
import { handlers } from '#/handlers/mod.ts'
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

  const getOutputMessageForInputMessage = (
    inputMessage: InputMessage,
  ): TE.TaskEither<ErrorOutputMessage, Array<OutputMessageInput>> => {
    return pipe(
      handlers,
      R.lookup(inputMessage.protocol),
      E.fromOption(() => {
        return new Error('ProtocolNotFound')
      }),
      E.map((protocolHandlers) => {
        return pipe(
          protocolHandlers,
          R.lookup(inputMessage.command),
          E.fromOption(() => {
            return new Error('CommandNotFound')
          }),
        )
      }),
      E.flatten,
      E.map((commandHandlers) => {
        const outputMessages: TE.TaskEither<ErrorOutputMessage, Array<OutputMessageInput>> =
          (handler as Handler<InputMessage, ErrorOutputMessage, OutputMessage>)(
            inputMessageResult as never,
          ) as TE.TaskEither<ErrorOutputMessage, Array<OutputMessageInput>>
      }),
    )
  }

  socket.addEventListener('open', () => {
    console.log('a client connected!')
  })

  socket.addEventListener('message', (event: MessageEvent<string>) => {
    return pipe(
      event.data,
      json.parse,
      E.map((inputMessage) => {
        return InputMessageTranscoder.decode(inputMessage) as E.Either<
          Const<TranscodeErrors, InputMessageInput>,
          InputMessage
        >
      }),
      E.flatten,
      TE.fromEitherK(E.map((inputMessageResult) => {
        return pipe(
          handlers[inputMessageResult.protocol as keyof typeof handlers],
          E.fromNullable,
          E.map((x) => {
            return
          }),
          // E.map(getProtocol)
          // E.map((x) => {
          //   return handlers[inputMessageResult.protocol as keyof typeof handlers]
          // }),
          // E.map((x) => {
          // })
        )

        const protocol = handlers[inputMessageResult.protocol as keyof typeof handlers]
        if (!protocol) {
          return E.left(new Error('ProtocolNotFound'))
        }
        const handler = protocol[inputMessageResult.command as keyof typeof protocol]
        if (!handler) {
          return E.left(new Error('HandlerNotFound'))
        }

        // I'm just taking a specific Error Message here for the typing to resolve.
        const outputMessages: TE.TaskEither<ErrorOutputMessage, Array<OutputMessageInput>> =
          (handler as Handler<InputMessage, ErrorOutputMessage, OutputMessage>)(
            inputMessageResult as never,
          ) as TE.TaskEither<ErrorOutputMessage, Array<OutputMessageInput>>

        return outputMessages
      })),
      TE.flatten,
      TE.map((outputMessageInputs) => {
        return pipe(
          outputMessageInputs,
          A.map((outputMessageInput) => {
            return OutputMessageTranscoder.decode(outputMessageInput) as E.Either<
              Const<TranscodeErrors, OutputMessageInput>,
              OutputMessage
            >
          }),
          TE.fromEitherK(E.sequenceArray),
        )
      }),
      TE.flatten,
      TE.map((outputMessages) => {
        return pipe(
          outputMessages,
          RA.map(json.stringify),
          E.sequenceArray,
          TE.fromEitherK(E.map((outputMessageStrings) => {
            return pipe(
              outputMessageStrings,
              RA.map(socketSend),
            )
          })),
        )
      }),
      TE.flatten,
      TE.match(
        (e) => {
          logError(E.toError(e))
        },
        () => {
        },
      ),
    )
  })

  return response
})
