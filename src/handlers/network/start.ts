import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { StartNetworkInputMessage } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import { StartedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'

export const start = (
  _message: StartNetworkInputMessage,
): TE.TaskEither<Error, Array<StartedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> => {
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
