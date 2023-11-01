import * as TE from 'fp-ts/TaskEither.ts'
import { RenameGroupInputMessage } from '#/schemas/messages/graph/input/RenameGroupInputMessage.ts'
import { RenameGroupOutputMessageInput } from '#/schemas/messages/graph/output/RenameGroupOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const renamegroup = (
  message: RenameGroupInputMessage,
): TE.TaskEither<Error, Array<RenameGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: renamegroup'))
}
