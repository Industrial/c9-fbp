import * as TE from 'fp-ts/TaskEither.ts'
import { EdgesNetworkOutputMessageInput } from '#/schemas/messages/network/output/EdgesNetworkOutputMessage.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { PersistNetworkInputMessage } from '#/schemas/messages/network/input/PersistNetworkInputMessage.ts'

// TODO: What do I return?
export const persist = (
  _message: PersistNetworkInputMessage,
): TE.TaskEither<Error, Array<EdgesNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> =>
  TE.right([
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
