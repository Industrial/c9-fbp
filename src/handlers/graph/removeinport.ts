import * as TE from 'fp-ts/TaskEither.ts'
import { RemoveInportInputMessage } from '#/schemas/messages/graph/input/RemoveInportInputMessage.ts'
import { RemoveInportOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const removeinport = (
  message: RemoveInportInputMessage,
): TE.TaskEither<Error, Array<RemoveInportOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: removeinport'))
}
