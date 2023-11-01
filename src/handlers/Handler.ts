import * as TE from 'fp-ts/TaskEither.ts'
import { InputMessage } from '#/schemas/messages/InputMessage.ts'
import { OutputMessageInput } from '#/schemas/messages/OutputMessage.ts'

export type Handler<
  I extends InputMessage,
  E extends Error,
  O extends OutputMessageInput,
> = (message: I) => TE.TaskEither<E, Array<O>>
