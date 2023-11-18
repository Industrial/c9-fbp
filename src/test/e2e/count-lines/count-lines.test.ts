import { AddEdgeGraphInputMessageInput } from '#/schemas/messages/graph/input/AddEdgeGraphInputMessage.ts'
import { AddEdgeGraphOutputMessageGuard } from '#/schemas/messages/graph/output/AddEdgeGraphOutputMessage.ts'
import { AddInitialGraphInputMessageInput } from '#/schemas/messages/graph/input/AddInitialGraphInputMessage.ts'
import { AddInitialGraphOutputMessageGuard } from '#/schemas/messages/graph/output/AddInitialGraphOutputMessage.ts'
import { AddInportGraphInputMessage } from '#/schemas/messages/graph/input/AddInportGraphInputMessage.ts'
import { AddInportGraphOutputMessageGuard } from '#/schemas/messages/graph/output/AddInportGraphOutputMessage.ts'
import { AddNodeGraphInputMessageInput } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddNodeGraphOutputMessageGuard } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { AddOutportGraphInputMessageInput } from '#/schemas/messages/graph/input/AddOutportGraphInputMessage.ts'
import { AddOutportGraphOutputMessageGuard } from '#/schemas/messages/graph/output/AddOutportGraphOutputMessage.ts'
import { ClearGraphInputMessageInput } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ClearGraphOutputMessageGuard } from '#/schemas/messages/graph/output/ClearGraphOutputMessage.ts'
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts'
import {
  assertOutputMatchesPredicates,
  createClient,
  createServer,
  destroyServer,
  whenClientHasClosed,
  whenClientHasOpened,
  whenMessageIsReceived,
} from '#/test/server.ts'
import { StartNetworkInputMessageInput } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import { StartedNetworkOutputMessageGuard } from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'

describe('e2e/count-lines', () => {
  beforeEach(async () => {
    await createServer()
    await createClient()
    await whenClientHasOpened()
  })

  afterEach(async () => {
    await whenClientHasClosed()
    await destroyServer()
  })

  it('should return a GraphNotFound ErrorGraphOutputMessage', async () => {
    await (async () => {
      const input: ClearGraphInputMessageInput = {
        protocol: 'graph',
        command: 'clear',
        payload: {
          id: 'main',
          name: 'Main',
          main: true,
          description: undefined,
          icon: undefined,
          library: undefined,
        },
      }
      await assertOutputMatchesPredicates(input, [ClearGraphOutputMessageGuard.is])
    })()

    await (async () => {
      const input: AddNodeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addnode',
        payload: {
          graph: 'main',
          component: 'ReadFile',
          id: 'Read',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddNodeGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddInportGraphInputMessage = {
        protocol: 'graph',
        command: 'addinport',
        payload: {
          graph: 'main',
          node: 'Read',
          port: 'source',
          public: 'source',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddInportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddOutportGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addoutport',
        payload: {
          graph: 'main',
          node: 'Read',
          port: 'out',
          public: 'out',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddOutportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddOutportGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addoutport',
        payload: {
          graph: 'main',
          node: 'Read',
          port: 'error',
          public: 'error',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddOutportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddInitialGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addinitial',
        payload: {
          graph: 'main',
          src: {
            data: './somefile.txt',
          },
          tgt: {
            node: 'Read',
            port: 'source',
          },
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddInitialGraphOutputMessageGuard.is])
    })()

    await (async () => {
      const input: AddNodeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addnode',
        payload: {
          graph: 'main',
          component: 'SplitString',
          id: 'Split',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddNodeGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddInportGraphInputMessage = {
        protocol: 'graph',
        command: 'addinport',
        payload: {
          graph: 'main',
          node: 'Split',
          port: 'in',
          public: 'in',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddInportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddOutportGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addoutport',
        payload: {
          graph: 'main',
          node: 'Split',
          port: 'out',
          public: 'out',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddOutportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddEdgeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addedge',
        payload: {
          graph: 'main',
          src: {
            node: 'Read',
            port: 'out',
          },
          tgt: {
            node: 'Split',
            port: 'in',
          },
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddEdgeGraphOutputMessageGuard.is])
    })()

    await (async () => {
      const input: AddNodeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addnode',
        payload: {
          graph: 'main',
          component: 'Count',
          id: 'Count',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddNodeGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddInportGraphInputMessage = {
        protocol: 'graph',
        command: 'addinport',
        payload: {
          graph: 'main',
          node: 'Count',
          port: 'in',
          public: 'in',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddInportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddOutportGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addoutport',
        payload: {
          graph: 'main',
          node: 'Count',
          port: 'count',
          public: 'count',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddOutportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddEdgeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addedge',
        payload: {
          graph: 'main',
          src: {
            node: 'Split',
            port: 'out',
          },
          tgt: {
            node: 'Count',
            port: 'in',
          },
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddEdgeGraphOutputMessageGuard.is])
    })()

    await (async () => {
      const input: AddNodeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addnode',
        payload: {
          graph: 'main',
          component: 'Output',
          id: 'Display',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddNodeGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddInportGraphInputMessage = {
        protocol: 'graph',
        command: 'addinport',
        payload: {
          graph: 'main',
          node: 'Display',
          port: 'in',
          public: 'in',
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddInportGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddEdgeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addedge',
        payload: {
          graph: 'main',
          src: {
            node: 'Count',
            port: 'count',
          },
          tgt: {
            node: 'Display',
            port: 'in',
          },
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddEdgeGraphOutputMessageGuard.is])
    })()
    await (async () => {
      const input: AddEdgeGraphInputMessageInput = {
        protocol: 'graph',
        command: 'addedge',
        payload: {
          graph: 'main',
          src: {
            node: 'Read',
            port: 'error',
          },
          tgt: {
            node: 'Display',
            port: 'in',
          },
          metadata: {},
        },
      }
      await assertOutputMatchesPredicates(input, [AddEdgeGraphOutputMessageGuard.is])
    })()

    await (async () => {
      const input: StartNetworkInputMessageInput = {
        protocol: 'network',
        command: 'start',
        payload: {
          graph: 'main',
        },
      }
      await assertOutputMatchesPredicates(input, [StartedNetworkOutputMessageGuard.is])
    })()

    // const messageEvent = await whenMessageIsReceived()

    // console.log('messageEvent', messageEvent)
  })
})
