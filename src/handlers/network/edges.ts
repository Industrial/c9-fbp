import * as TE from 'fp-ts/TaskEither.ts'
import { EdgesNetworkInputMessage } from '#/schemas/messages/network/input/EdgesNetworkInputMessage.ts'
import { EdgesNetworkOutputMessageInput } from '#/schemas/messages/network/output/EdgesNetworkOutputMessage.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'

export const edges = (
  _message: EdgesNetworkInputMessage,
): TE.TaskEither<Error, Array<EdgesNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> => {
  return TE.right([
    {
      protocol: 'network',
      command: 'error',
      payload: {
        message: 'foo',
        graph: 'foo',
        stack: undefined,
      },
    },
  ])
}
