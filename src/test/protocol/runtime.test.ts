import { GetRuntimeRuntimeInputMessageInput } from '#/schemas/messages/runtime/input/GetRuntimeRuntimeInputMessage.ts'
import { RuntimeRuntimeOutputMessage } from '#/schemas/messages/runtime/output/RuntimeRuntimeOutputMessage.ts'
import { UUID } from 'schemata-ts'
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts'
import {
  assertOutputMatchesExpected,
  createClient,
  createServer,
  destroyServer,
  whenClientHasClosed,
  whenClientHasOpened,
} from '#/test/server.ts'

describe('Runtime', () => {
  beforeEach(async () => {
    await createServer()
    await createClient()
    await whenClientHasOpened()
  })

  afterEach(async () => {
    await whenClientHasClosed()
    await destroyServer()
  })

  describe('Runtime Protocol', () => {
    describe('requesting runtime metadata', () => {
      it('should provide it back', async () => {
        const input: GetRuntimeRuntimeInputMessageInput = {
          protocol: 'runtime',
          command: 'getruntime',
          payload: {},
        }
        const output: RuntimeRuntimeOutputMessage = {
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
          },
        }
        await assertOutputMatchesExpected(input, [output])
      })
    })
  })
})
