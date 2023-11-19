import * as E from 'fp-ts/Either.ts'
import * as IO from 'fp-ts/IO.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as json from 'fp-ts/Json.ts'
import { Const } from 'fp-ts/Const.ts'
import { InputMessage, InputMessageInput, InputMessageTranscoder } from '#/schemas/messages/InputMessage.ts'
import { OutputMessage, OutputMessageInput, OutputMessageTranscoder } from '#/schemas/messages/OutputMessage.ts'
import { TranscodeErrors } from 'schemata-ts/TranscodeError'
import { drawErrorTree } from 'schemata-ts/Transcoder'
import { getHandlerByInputMessage } from '#/handlers.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const logErrorGraph = (error: Error): IO.IO<void> => () =>
  console.error(Deno.inspect(error, {
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
  }))

export const transcodeErrorGraph = (
  inputMessageInput: InputMessageInput | OutputMessageInput,
  errors: TranscodeErrors,
) => new Error(`${JSON.stringify(inputMessageInput)}: ${drawErrorTree(errors)}`)

export const decodeInputMessage = (inputMessageInput: InputMessageInput): E.Either<Error, InputMessage> =>
  pipe(
    InputMessageTranscoder.decode(inputMessageInput) as E.Either<
      Const<TranscodeErrors, InputMessageInput>,
      InputMessage
    >,
    E.mapLeft((errors) => transcodeErrorGraph(inputMessageInput, errors)),
  )

export const parseInputMessage = (inputMessageString: string): E.Either<Error, InputMessage> =>
  pipe(
    inputMessageString,
    json.parse,
    E.map((json) => json as InputMessageInput),
    E.mapLeft((e) => new Error(String(e))),
    E.chain(decodeInputMessage),
  )

export const decodeOutputMessage = (outputMessageInput: OutputMessageInput): E.Either<Error, OutputMessage> =>
  pipe(
    OutputMessageTranscoder.decode(outputMessageInput) as E.Either<
      Const<TranscodeErrors, OutputMessageInput>,
      OutputMessage
    >,
    E.mapLeft((errors) => transcodeErrorGraph(outputMessageInput, errors)),
  )

export const socketSend = (socket: WebSocket) => (outputMessageString: string): IO.IO<void> => () =>
  socket.send(outputMessageString)

export const sendOutputMessage = (socket: WebSocket) => (outputMessageInput: OutputMessageInput): IO.IO<void> => () => {
  // TODO: Fix this. This is probably very wrong. I don't want the calling code
  // of this function (message handler) to handle the possible error that may
  // occur here. Instead I just want to log it.
  const x = pipe(
    E.right(outputMessageInput),
    E.chain(decodeOutputMessage),
    E.chain(json.stringify),
    E.mapLeft((error) => new Error('SendOutput', { cause: error })),
    E.map(socketSend(socket)),
    E.orElse((error) => E.right(logErrorGraph(error))),
  )

  if (E.isRight(x)) {
    x.right()
  }
}

export const handleMessage = (message: string, socket: WebSocket): void => {
  pipe(
    E.right(message),
    E.chain(parseInputMessage),
    TE.fromEitherK(identity),
    TE.chain((inputMessage) =>
      TE.rightTask(getHandlerByInputMessage(inputMessage)(sendOutputMessage(socket))(inputMessage))
    ),
    TE.match(
      (error) => {
        logErrorGraph(error)()
      },
      () => {},
    ),
  )()
}

export const handleError = (error: unknown): Response =>
  new Response((error as Error).message, {
    status: 500,
  })

export const handleListen = () => {}

export const handleRequest = (req: Request): Response => {
  if (req.headers.get('upgrade') != 'websocket') {
    new Response(null, {
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

  socket.addEventListener('message', (event: MessageEvent<string>) => handleMessage(event.data, socket))

  return response
}

export const startServer = (hostname: string, port: number): Deno.Server =>
  Deno.serve({
    hostname,
    port,
    onError: handleError,
    onListen: handleListen,
    reusePort: true,
  }, handleRequest)
