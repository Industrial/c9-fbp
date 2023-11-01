import * as TE from 'fp-ts/TaskEither.ts'
import { AddInportInputMessage } from '#/schemas/messages/graph/input/AddInportInputMessage.ts'
import { AddInportOutputMessageInput } from '#/schemas/messages/graph/output/AddInportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const addinport = (
  message: AddInportInputMessage,
): TE.TaskEither<Error, Array<AddInportOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: addinport'))
}
