import * as TE from 'fp-ts/TaskEither.ts'
import { ChangeNodeInputMessage } from '#/schemas/messages/graph/input/ChangeNodeInputMessage.ts'
import { ChangeNodeOutputMessageInput } from '#/schemas/messages/graph/output/ChangeNodeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const changenode = (
  message: ChangeNodeInputMessage,
): TE.TaskEither<Error, Array<ChangeNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: changenode'))
}
