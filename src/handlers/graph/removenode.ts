import * as TE from 'fp-ts/TaskEither.ts'
import { RemoveNodeInputMessage } from '#/schemas/messages/graph/input/RemoveNodeInputMessage.ts'
import { RemoveNodeOutputMessageInput } from '#/schemas/messages/graph/output/RemoveNodeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const removenode = (
  message: RemoveNodeInputMessage,
): TE.TaskEither<Error, Array<RemoveNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: removenode'))
}
