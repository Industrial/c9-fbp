import * as TE from 'fp-ts/TaskEither.ts'
import { RemoveGroupInputMessage } from '#/schemas/messages/graph/input/RemoveGroupInputMessage.ts'
import { RemoveGroupOutputMessageInput } from '#/schemas/messages/graph/output/RemoveGroupOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const removegroup = (
  message: RemoveGroupInputMessage,
): TE.TaskEither<Error, Array<RemoveGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: removegroup'))
}
