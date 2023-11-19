import * as T from 'fp-ts/Task.ts'
import { EdgesNetworkInputMessage } from '#/schemas/messages/network/input/EdgesNetworkInputMessage.ts'
import { EdgesNetworkOutputMessageInput } from '#/schemas/messages/network/output/EdgesNetworkOutputMessage.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const edges: MessageHandler<
  EdgesNetworkInputMessage,
  EdgesNetworkOutputMessageInput | ErrorNetworkOutputMessageInput
> = (send) => (message) =>
  T.fromIO(() => {
    send({
      protocol: 'network',
      command: 'error',
      payload: {
        message: 'NotImplemented',
        graph: message.payload.graph,
        stack: undefined,
      },
    })()
  })
