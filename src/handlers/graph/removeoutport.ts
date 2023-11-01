import * as TE from 'fp-ts/TaskEither.ts'
import { RemoveOutportInputMessage } from '#/schemas/messages/graph/input/RemoveOutportInputMessage.ts'
import { RemoveOutportOutputMessageInput } from '#/schemas/messages/graph/output/RemoveOutportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const removeoutport = (
  message: RemoveOutportInputMessage,
): TE.TaskEither<Error, Array<RemoveOutportOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: removeoutport'))
}
