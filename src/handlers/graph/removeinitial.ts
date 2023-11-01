import * as TE from 'fp-ts/TaskEither.ts'
import { RemoveInitialInputMessage } from '#/schemas/messages/graph/input/RemoveInitialInputMessage.ts'
import { RemoveInitialOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInitialOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export const removeinitial = (
  message: RemoveInitialInputMessage,
): TE.TaskEither<Error, Array<RemoveInitialOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.left(new Error('NotImplemented: removeinitial'))
}
