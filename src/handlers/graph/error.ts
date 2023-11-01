import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorInputMessage } from '#/schemas/messages/graph/input/ErrorInputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const error = (
  message: ErrorInputMessage,
): TE.TaskEither<Error, Array<ErrorOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: error'))
}
