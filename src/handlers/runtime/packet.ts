import * as T from 'fp-ts/Task.ts'
import { ErrorRuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/ErrorRuntimeOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { PacketRuntimeInputMessage } from '#/schemas/messages/runtime/input/PacketRuntimeInputMessage.ts'
import { PacketRuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/PacketRuntimeOutputMessage.ts'

export const packet: MessageHandler<
  PacketRuntimeInputMessage,
  PacketRuntimeOutputMessageInput | ErrorRuntimeOutputMessageInput
> = (send) => (message) =>
  T.fromIO(() => {
    send({
      protocol: 'runtime',
      command: 'error',
      payload: {
        message: 'foo',
      },
    })()
  })
