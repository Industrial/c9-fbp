import * as T from 'fp-ts/Task.ts'
import { ErrorRuntimeOutputMessage } from '#/schemas/messages/runtime/output/ErrorRuntimeOutputMessage.ts'
import { GetRuntimeRuntimeInputMessage } from '#/schemas/messages/runtime/input/GetRuntimeRuntimeInputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RuntimeRuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/RuntimeRuntimeOutputMessage.ts'

export const getruntime: MessageHandler<
  GetRuntimeRuntimeInputMessage,
  RuntimeRuntimeOutputMessageInput | ErrorRuntimeOutputMessage
> = (send) => (message) =>
  T.fromIO(() => {
    send({
      protocol: 'runtime',
      command: 'runtime',
      payload: {
        capabilities: [
          'protocol:graph',
          'protocol:network',
          'protocol:component',
        ],
        allCapabilities: [
          'protocol:graph',
          'protocol:network',
          'protocol:component',
        ],
        graph: 'main',
        id: '39dbe36b-9a6e-4899-9136-916fbb24aba0',
        label: 'derp',
        namespace: 'derp',
        repository: 'derp',
        repositoryVersion: 'derp',
        type: 'derp',
        version: 'derp',
        // secret: 'derp',
      },
    })()
  })
