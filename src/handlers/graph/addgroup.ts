import * as TE from 'fp-ts/TaskEither.ts'
import { AddGroupInputMessage } from '#/schemas/messages/graph/input/AddGroupInputMessage.ts'
import { AddGroupOutputMessageInput } from '#/schemas/messages/graph/output/AddGroupOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const addgroup = (
  message: AddGroupInputMessage,
): TE.TaskEither<Error, Array<AddGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: addgroup'))
}
