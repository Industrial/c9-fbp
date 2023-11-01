import * as TE from 'fp-ts/TaskEither.ts'
import { RenameNodeInputMessage } from '#/schemas/messages/graph/input/RenameNodeInputMessage.ts'
import { RenameNodeOutputMessageInput } from '#/schemas/messages/graph/output/RenameNodeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const renamenode = (
  message: RenameNodeInputMessage,
): TE.TaskEither<Error, Array<RenameNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: renamenode'))
}
