import * as TE from 'fp-ts/TaskEither.ts'
import { RenameInportInputMessage } from '#/schemas/messages/graph/input/RenameInportInputMessage.ts'
import { RenameInportOutputMessageInput } from '#/schemas/messages/graph/output/RenameInportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const renameinport = (
  message: RenameInportInputMessage,
): TE.TaskEither<Error, Array<RenameInportOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: renameinport'))
}
