import * as T from 'fp-ts/Task.ts'
import * as IO from 'fp-ts/IO.ts'
import { InputMessage } from '#/schemas/messages/InputMessage.ts'
import { OutputMessageInput } from '#/schemas/messages/OutputMessage.ts'

export type MessageHandlerSend<O extends OutputMessageInput = OutputMessageInput> = (
  outputMessage: O,
) => IO.IO<void>

export type MessageHandler<
  I extends InputMessage = InputMessage,
  O extends OutputMessageInput = OutputMessageInput,
> = (
  send: MessageHandlerSend<O>,
) => (inputMessage: I) => T.Task<void>
