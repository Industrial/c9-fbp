import * as TE from 'fp-ts/TaskEither.ts'
import { AddInitialInputMessage } from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import { AddInitialOutputMessageInput } from '#/schemas/messages/graph/output/AddInitialOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const addinitial = (
  message: AddInitialInputMessage,
): TE.TaskEither<Error, Array<AddInitialOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: addinitial'))
}
