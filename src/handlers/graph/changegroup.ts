import * as TE from 'fp-ts/TaskEither.ts'
import { ChangeGroupInputMessage } from '#/schemas/messages/graph/input/ChangeGroupInputMessage.ts'
import { ChangeGroupOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const changegroup = (
  message: ChangeGroupInputMessage,
): TE.TaskEither<Error, Array<ChangeGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: changegroup'))
}
