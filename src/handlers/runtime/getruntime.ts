import { GetRuntimeInputMessage } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import { RuntimeOutputMessage } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'

export const getruntime = async (message: GetRuntimeInputMessage): Promise<Array<RuntimeOutputMessage>> => {
  const output: RuntimeOutputMessage = {
    protocol: 'runtime',
    command: 'runtime',
    payload: {
      secret: 'derp',
    },
  }
  return [output]
}
