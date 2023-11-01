import * as TE from 'fp-ts/TaskEither.ts'
import { AddOutportInputMessage } from '#/schemas/messages/graph/input/AddOutportInputMessage.ts'
import { AddOutportOutputMessageInput } from '#/schemas/messages/graph/output/AddOutportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const addoutport = (
  message: AddOutportInputMessage,
): TE.TaskEither<Error, Array<AddOutportOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: addoutport'))
}
