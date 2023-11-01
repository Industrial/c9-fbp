import * as TE from 'fp-ts/TaskEither.ts'
import { RemoveEdgeInputMessage } from '#/schemas/messages/graph/input/RemoveEdgeInputMessage.ts'
import { RemoveEdgeOutputMessageInput } from '#/schemas/messages/graph/output/RemoveEdgeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const removeedge = (
  message: RemoveEdgeInputMessage,
): TE.TaskEither<Error, Array<RemoveEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: removeedge'))
}
