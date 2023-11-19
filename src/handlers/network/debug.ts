import * as T from 'fp-ts/Task.ts'
import { DebugNetworkInputMessage } from '#/schemas/messages/network/input/DebugNetworkInputMessage.ts'
import { EdgesNetworkOutputMessageInput } from '#/schemas/messages/network/output/EdgesNetworkOutputMessage.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const debug: MessageHandler<
  DebugNetworkInputMessage,
  EdgesNetworkOutputMessageInput | ErrorNetworkOutputMessageInput
> = (send) => (_message) =>
  T.fromIO(() => {
    send({
      protocol: 'network',
      command: 'error',
      payload: {
        message: 'foo',
        graph: 'foo',
        stack: undefined,
      },
    })()
  })
