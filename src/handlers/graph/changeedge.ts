import * as TE from 'fp-ts/TaskEither.ts'
import { ChangeEdgeInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import { ChangeEdgeOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const changeedge = (
  message: ChangeEdgeInputMessage,
): TE.TaskEither<Error, Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: changeedge'))
}
