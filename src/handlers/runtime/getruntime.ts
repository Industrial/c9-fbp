import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorRuntimeOutputMessage } from '#/schemas/messages/runtime/output/ErrorRuntimeOutputMessage.ts'
import { GetRuntimeRuntimeInputMessage } from '#/schemas/messages/runtime/input/GetRuntimeRuntimeInputMessage.ts'
import { RuntimeRuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/RuntimeRuntimeOutputMessage.ts'

export const getruntime = (
  _message: GetRuntimeRuntimeInputMessage,
): TE.TaskEither<Error, Array<RuntimeRuntimeOutputMessageInput | ErrorRuntimeOutputMessage>> => {
  return TE.right([{
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
  }])
}
