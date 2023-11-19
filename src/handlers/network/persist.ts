import * as T from 'fp-ts/Task.ts'
import { EdgesNetworkOutputMessageInput } from '#/schemas/messages/network/output/EdgesNetworkOutputMessage.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { PersistNetworkInputMessage } from '#/schemas/messages/network/input/PersistNetworkInputMessage.ts'

// TODO: What do I return?
export const persist: MessageHandler<
  PersistNetworkInputMessage,
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
