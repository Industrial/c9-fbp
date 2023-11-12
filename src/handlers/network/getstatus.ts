import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { GetStatusNetworkInputMessage } from '#/schemas/messages/network/input/GetStatusNetworkInputMessage.ts'
import { StatusNetworkOutputMessageInput } from '#/schemas/messages/network/output/StatusNetworkOutputMessage.ts'

export const getstatus = (
  _message: GetStatusNetworkInputMessage,
): TE.TaskEither<Error, Array<StatusNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> => {
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
