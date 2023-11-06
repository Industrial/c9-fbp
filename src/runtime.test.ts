import { AddEdgeInputMessageInput } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddGroupInputMessageInput } from '#/schemas/messages/graph/input/AddGroupInputMessage.ts'
import { AddInitialInputMessageInput } from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import { AddInportInputMessageInput } from '#/schemas/messages/graph/input/AddInportInputMessage.ts'
import { AddOutportInputMessageInput } from '#/schemas/messages/graph/input/AddOutportInputMessage.ts'
import { ChangeEdgeInputMessageInput } from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import { ChangeGroupInputMessageInput } from '#/schemas/messages/graph/input/ChangeGroupInputMessage.ts'
import { ClearInputMessageInput } from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import { GetRuntimeInputMessageInput } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import { RemoveEdgeInputMessageInput } from '#/schemas/messages/graph/input/RemoveEdgeInputMessage.ts'
import { RemoveGroupInputMessageInput } from '#/schemas/messages/graph/input/RemoveGroupInputMessage.ts'
import { RemoveInitialInputMessageInput } from '#/schemas/messages/graph/input/RemoveInitialInputMessage.ts'
import { RemoveInportInputMessageInput } from '#/schemas/messages/graph/input/RemoveInportInputMessage.ts'
import { RemoveNodeInputMessageInput } from '#/schemas/messages/graph/input/RemoveNodeInputMessage.ts'
import { RemoveOutportInputMessageInput } from '#/schemas/messages/graph/input/RemoveOutportInputMessage.ts'
import { RenameGroupInputMessageInput } from '#/schemas/messages/graph/input/RenameGroupInputMessage.ts'
import { RenameInportInputMessageInput } from '#/schemas/messages/graph/input/RenameInportInputMessage.ts'
import { RenameNodeInputMessageInput } from '#/schemas/messages/graph/input/RenameNodeInputMessage.ts'
import { RenameOutportInputMessageInput } from '#/schemas/messages/graph/input/RenameOutportInputMessage.ts'
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts'
import { assertObjectMatch } from 'std/assert/mod.ts'
import { startServer } from '#/server.ts'

const config = JSON.parse(await Deno.readTextFile('./fbp-config.json'))
const hostname = config.host as string
const port = config.port as number

let serverInstance: Deno.Server | undefined
let socketInstance: WebSocket

const createServer = async () => {
  serverInstance = startServer(hostname, port)
}

const destroyServer = async () => {
  await serverInstance?.shutdown()
  serverInstance = undefined
}

const createClient = async () => {
  socketInstance = new WebSocket(`ws://${hostname}:${port}`)
}

const whenClientHasOpened = async (socketInstance: WebSocket) => {
  return await new Promise<void>((resolve) => {
    socketInstance.onopen = () => {
      resolve()
      socketInstance.onopen = null
    }
  })
}

const whenClientHasClosed = async (socketInstance: WebSocket) => {
  return await new Promise<void>((resolve) => {
    socketInstance.onclose = () => {
      resolve()
      socketInstance.onclose = null
    }
    socketInstance.close()
  })
}

const whenMessageIsReceived = async (socketInstance: WebSocket): Promise<MessageEvent<unknown>> => {
  return await new Promise((resolve, reject) => {
    socketInstance.onmessage = (event) => {
      resolve(event)
      socketInstance.onmessage = null
      socketInstance.onerror = null
    }

    socketInstance.onerror = (event) => {
      reject(event)
      socketInstance.onmessage = null
      socketInstance.onerror = null
    }
  })
}

const assertOutputMatchesExpected = async (
  socketInstance: WebSocket,
  actual: Record<string, unknown>,
  expected: Array<Record<string, unknown>>,
) => {
  if (expected.length === 0) {
    return
  }

  const resultPromise = whenMessageIsReceived(socketInstance)
  socketInstance.send(JSON.stringify(actual))

  const result = await resultPromise
  const resultJSON = JSON.parse(result.data as string)
  const currentExpectation = expected.slice(0, 1)[0]

  assertObjectMatch(resultJSON, currentExpectation)

  await assertOutputMatchesExpected(socketInstance, actual, expected.slice(1))
}

describe('Runtime', () => {
  beforeEach(async () => {
    await createServer()
    await createClient()
    await whenClientHasOpened(socketInstance)
  })

  afterEach(async () => {
    await whenClientHasClosed(socketInstance)
    await destroyServer()
  })

  describe('Runtime Protocol', () => {
    describe('requesting runtime metadata', () => {
      it('should provide it back', async () => {
        const input: GetRuntimeInputMessageInput = {
          protocol: 'runtime',
          command: 'getruntime',
          payload: {},
        }

        await assertOutputMatchesExpected(
          socketInstance,
          input,
          [
            {
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
              },
            },
          ],
        )
      })
    })
  })

  describe('Graph Protocol', () => {
    describe('Operations that should fail without existing state', () => {
      beforeEach(async () => {
        const input: ClearInputMessageInput = {
          protocol: 'graph',
          command: 'clear',
          payload: {
            id: 'foo',
            name: 'foo',
            main: true,
          },
        }
        await assertOutputMatchesExpected(
          socketInstance,
          input,
          [
            {
              protocol: 'graph',
              command: 'clear',
              payload: {
                id: 'foo',
                name: 'foo',
                main: true,
              },
            },
          ],
        )
      })

      describe('AddEdge', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: AddEdgeInputMessageInput = {
            protocol: 'graph',
            command: 'addedge',
            payload: {
              graph: 'foo',
              src: {
                node: 'somenode',
                port: 'someport',
              },
              tgt: {
                node: 'someothernode',
                port: 'someotherport',
              },
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('AddGroup', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: AddGroupInputMessageInput = {
            protocol: 'graph',
            command: 'addgroup',
            payload: {
              graph: 'foo',
              name: 'somename',
              nodes: ['somenonexistantnode'],
              metadata: {
                description: 'somedescription',
              },
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('AddInitial', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: AddInitialInputMessageInput = {
            protocol: 'graph',
            command: 'addinitial',
            payload: {
              graph: 'foo',
              src: {
                data: 'somedata',
              },
              tgt: {
                node: 'someothernode',
                port: 'someotherport',
              },
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('AddInport', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: AddInportInputMessageInput = {
            protocol: 'graph',
            command: 'addinport',
            payload: {
              graph: 'foo',
              node: 'somenode',
              port: 'someport',
              public: 'someport',
              metadata: {
                description: 'somedescription',
              },
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('AddOutport', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: AddOutportInputMessageInput = {
            protocol: 'graph',
            command: 'addoutport',
            payload: {
              graph: 'foo',
              node: 'somenode',
              port: 'someport',
              public: 'someport',
              metadata: {
                description: 'somedescription',
              },
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('ChangeEdge', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: ChangeEdgeInputMessageInput = {
            protocol: 'graph',
            command: 'changeedge',
            payload: {
              graph: 'foo',
              src: {
                node: 'somenode',
                port: 'someport',
              },
              tgt: {
                node: 'someothernode',
                port: 'someotherport',
              },
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('ChangeGroup', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: ChangeGroupInputMessageInput = {
            protocol: 'graph',
            command: 'changegroup',
            payload: {
              name: 'foo',
              graph: 'foo',
              metadata: {
                description: 'foo',
              },
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('ChangeNode', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: ChangeEdgeInputMessageInput = {
            protocol: 'graph',
            command: 'changeedge',
            payload: {
              graph: 'foo',
              src: {
                node: 'foo',
                port: 'foo',
              },
              tgt: {
                node: 'bar',
                port: 'bar',
              },
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RemoveEdge', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RemoveEdgeInputMessageInput = {
            protocol: 'graph',
            command: 'removeedge',
            payload: {
              graph: 'foo',
              src: {
                node: 'somenode',
                port: 'someport',
              },
              tgt: {
                node: 'someothernode',
                port: 'someotherport',
              },
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RemoveGroup', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RemoveGroupInputMessageInput = {
            protocol: 'graph',
            command: 'removegroup',
            payload: {
              graph: 'foo',
              name: 'foo',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RemoveInitial', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RemoveInitialInputMessageInput = {
            protocol: 'graph',
            command: 'removeinitial',
            payload: {
              graph: 'foo',
              src: {
                data: 'test',
              },
              tgt: {
                node: 'someothernode',
                port: 'someotherport',
              },
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RemoveInport', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RemoveInportInputMessageInput = {
            protocol: 'graph',
            command: 'removeinport',
            payload: {
              graph: 'foo',
              public: 'someport',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RemoveNode', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RemoveNodeInputMessageInput = {
            protocol: 'graph',
            command: 'removenode',
            payload: {
              graph: 'foo',
              id: 'foo',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RemoveOutport', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RemoveOutportInputMessageInput = {
            protocol: 'graph',
            command: 'removeoutport',
            payload: {
              graph: 'foo',
              public: 'someport',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RenameGroup', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RenameGroupInputMessageInput = {
            protocol: 'graph',
            command: 'renamegroup',
            payload: {
              graph: 'foo',
              from: 'foo',
              to: 'bar',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RenameInport', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RenameInportInputMessageInput = {
            protocol: 'graph',
            command: 'renameinport',
            payload: {
              graph: 'foo',
              from: 'someport',
              to: 'someotherport',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RenameNode', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RenameNodeInputMessageInput = {
            protocol: 'graph',
            command: 'renamenode',
            payload: {
              graph: 'foo',
              from: 'foo',
              to: 'bar',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })

      describe('RenameOutport', () => {
        it('should return an ErrorOutputMessage', async () => {
          const input: RenameOutportInputMessageInput = {
            protocol: 'graph',
            command: 'renameinport',
            payload: {
              graph: 'foo',
              from: 'someport',
              to: 'someotherport',
            },
          }
          await assertOutputMatchesExpected(
            socketInstance,
            input,
            [
              {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NotFound',
                },
              },
            ],
          )
        })
      })
    })
  })
})
