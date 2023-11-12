import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { StopNetworkInputMessage } from '#/schemas/messages/network/input/StopNetworkInputMessage.ts'
import { StoppedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StoppedNetworkOutputMessage.ts'

export const stop = (
  _message: StopNetworkInputMessage,
): TE.TaskEither<Error, Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> => {
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
