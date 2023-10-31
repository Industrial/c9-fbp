import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorOutputMessage } from '#/schemas/messages/runtime/output/ErrorOutputMessage.ts'
import { GetRuntimeInputMessage } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import { Handler } from '#/handlers/Handler.ts'
import { RuntimeOutputMessage } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'
import { UUID } from 'schemata-ts'

export const getruntime: Handler<GetRuntimeInputMessage, ErrorOutputMessage, RuntimeOutputMessage> = (_message) => {
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
      id: '39dbe36b-9a6e-4899-9136-916fbb24aba0' as unknown as UUID<4>,
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
