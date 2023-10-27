import { GetRuntimeInputMessage } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import { RuntimeOutputMessage } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'
import { UUID } from 'schemata-ts'

export const getruntime = async (message: GetRuntimeInputMessage): Promise<Array<RuntimeOutputMessage>> => {
  const output: RuntimeOutputMessage = {
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
  }
  return [output]
}
