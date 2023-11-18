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
import { drawErrorTree } from 'schemata-ts/Transcoder'
import { pipe } from 'fp-ts/function.ts'

export const logErrorGraph = (error: Error) =>
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

export const getOutputMessagesForInputMessage = (
  inputMessage: InputMessage,
): TE.TaskEither<Error, Array<OutputMessageInput>> => {
  const protocolHandlers = handlers[inputMessage.protocol as keyof typeof handlers]
  const handler = protocolHandlers[inputMessage.command as keyof typeof protocolHandlers] as (
    input: InputMessage,
  ) => TE.TaskEither<Error, Array<OutputMessageInput>>
  const outputMessageInputs = handler(inputMessage)
  return outputMessageInputs
}

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

export const parseInputMessage = (inputMessageString: string): TE.TaskEither<Error, InputMessage> =>
  pipe(
    inputMessageString,
    json.parse,
    E.map((json) => json as InputMessageInput),
    E.map(decodeInputMessage),
    E.flatten,
    TE.fromEither,
  )

export const decodeOutputMessage = (outputMessageInput: OutputMessageInput): E.Either<Error, OutputMessage> =>
  pipe(
    OutputMessageTranscoder.decode(outputMessageInput) as E.Either<
      Const<TranscodeErrors, OutputMessageInput>,
      OutputMessage
    >,
    E.mapLeft((errors) => transcodeErrorGraph(outputMessageInput, errors)),
  )

export const decodeOutputMessages = (
  outputMessageInputs: Array<OutputMessageInput>,
): TE.TaskEither<Error, Array<OutputMessage>> =>
  pipe(
    outputMessageInputs,
    A.map(decodeOutputMessage),
    TE.fromEitherK(E.sequenceArray),
    TE.map((outputMessages) => outputMessages as Array<OutputMessage>),
  )

export const socketSend = (outputMessageString: string) => (socket: WebSocket): IO.IO<void> => () =>
  socket.send(outputMessageString)

export const sendOutputMessages =
  (socket: WebSocket) => (outputMessages: ReadonlyArray<OutputMessage>): TE.TaskEither<Error, Array<void>> =>
    pipe(
      outputMessages,
      RA.map(json.stringify),
      E.sequenceArray,
      TE.fromEitherK(E.map((outputMessageStrings) =>
        pipe(
          outputMessageStrings,
          RA.map((outputMessageString) => socketSend(outputMessageString)(socket)()),
        )
      )),
      TE.mapLeft((error) => new Error('SendOutput', { cause: error })),
      TE.map((steps) => steps as Array<void>),
    )

export const handleMessage = (message: string, socket: WebSocket): void => {
  pipe(
    TE.right(message),
    TE.chain(parseInputMessage),
    TE.chain(getOutputMessagesForInputMessage),
    TE.chain(decodeOutputMessages),
    TE.chain(sendOutputMessages(socket)),
    TE.match(
      (error) => logErrorGraph(error as Error),
      () => {},
    ),
  )()
}

export const handleError = (error: unknown): Response =>
  new Response((error as Error).message, {
    status: 500,
  })

export const handleListen = () => {}
// console.log('listening?')

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
