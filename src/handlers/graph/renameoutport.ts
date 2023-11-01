import * as TE from 'fp-ts/TaskEither.ts'
import { RenameOutportInputMessage } from '#/schemas/messages/graph/input/RenameOutportInputMessage.ts'
import { RenameOutportOutputMessageInput } from '#/schemas/messages/graph/output/RenameOutportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const renameoutport = (
  message: RenameOutportInputMessage,
): TE.TaskEither<Error, Array<RenameOutportOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: renameoutport'))
}
