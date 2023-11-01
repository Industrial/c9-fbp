import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/runtime/output/ErrorOutputMessage.ts'
import { GetRuntimeInputMessage } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import { RuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'

export const getruntime = (
  _message: GetRuntimeInputMessage,
): TE.TaskEither<Error, Array<RuntimeOutputMessageInput | ErrorOutputMessageInput>> => {
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
