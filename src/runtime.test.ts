import chai from 'chai'
import { AddEdgeInputMessageInput } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddEdgeOutputMessage } from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import { AddGroupInputMessageInput } from '#/schemas/messages/graph/input/AddGroupInputMessage.ts'
import { AddGroupOutputMessage } from '#/schemas/messages/graph/output/AddGroupOutputMessage.ts'
import { AddInitialInputMessageInput } from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import { AddInportInputMessageInput } from '#/schemas/messages/graph/input/AddInportInputMessage.ts'
import { AddInportOutputMessage } from '#/schemas/messages/graph/output/AddInportOutputMessage.ts'
import { AddNodeInputMessage, AddNodeInputMessageInput } from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import { AddNodeOutputMessage } from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import { AddOutportInputMessageInput } from '#/schemas/messages/graph/input/AddOutportInputMessage.ts'
import { AddOutportOutputMessage } from '#/schemas/messages/graph/output/AddOutportOutputMessage.ts'
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
import { ErrorOutputMessage } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { ClearOutputMessage, ClearOutputMessageInput } from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import { RuntimeOutputMessage } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'
import { UUID } from 'schemata-ts'
import { AddInitialOutputMessage } from '#/schemas/messages/graph/output/AddInitialOutputMessage.ts'
import { ChangeGroupOutputMessage } from '#/schemas/messages/graph/output/ChangeGroupOutputMessage.ts'
import { ChangeNodeInputMessageInput } from '#/schemas/messages/graph/input/ChangeNodeInputMessage.ts'
import { ChangeNodeOutputMessage } from '#/schemas/messages/graph/output/ChangeNodeOutputMessage.ts'
import { RemoveEdgeOutputMessage } from '#/schemas/messages/graph/output/RemoveEdgeOutputMessage.ts'
import { RemoveGroupOutputMessage } from '#/schemas/messages/graph/output/RemoveGroupOutputMessage.ts'
import { RemoveInitialOutputMessage } from '#/schemas/messages/graph/output/RemoveInitialOutputMessage.ts'
import { RemoveInportOutputMessage } from '#/schemas/messages/graph/output/RemoveInportOutputMessage.ts'
import { RemoveOutportOutputMessage } from '#/schemas/messages/graph/output/RemoveOutportOutputMessage.ts'
import { RemoveNodeOutputMessage } from '#/schemas/messages/graph/output/RemoveNodeOutputMessage.ts'
import { RenameGroupOutputMessage } from '#/schemas/messages/graph/output/RenameGroupOutputMessage.ts'
import { RenameInportOutputMessage } from '#/schemas/messages/graph/output/RenameInportOutputMessage.ts'
import { RenameOutportOutputMessage } from '#/schemas/messages/graph/output/RenameOutportOutputMessage.ts'
import { RenameNodeOutputMessage } from '#/schemas/messages/graph/output/RenameNodeOutputMessage.ts'

chai.config.truncateThreshold = 0

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

  const removeUndefineds = (x: unknown) => {
    return JSON.parse(JSON.stringify(x))
  }

  chai.expect(removeUndefineds(resultJSON)).to.deep.equal(removeUndefineds(currentExpectation))

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
          },
        }
        await assertOutputMatchesExpected(socketInstance, input, [output])
      })
    })
  })

  describe('Graph Protocol', () => {
    describe('When no Clear has been passed', () => {
      it('should return a GraphNotFound ErrorOutputMessage', async () => {
        const input: AddNodeInputMessageInput = {
          protocol: 'graph',
          command: 'addnode',
          payload: {
            component: 'foo',
            graph: 'foo',
            id: 'foo',
            metadata: {},
          },
        }
        const output: ErrorOutputMessage = {
          protocol: 'graph',
          command: 'error',
          payload: {
            message: 'GraphNotFound',
          },
        }
        await assertOutputMatchesExpected(socketInstance, input, [output])
      })
    })

    describe('When Clear has been passed', () => {
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
        // Don't use the ClearOutputMessage type here because it includes
        // undefined values which are not serialized/parsed by JSON.
        const output = {
          protocol: 'graph',
          command: 'clear',
          payload: {
            id: 'foo',
            name: 'foo',
            main: true,
            // library: undefined,
            // icon: undefined,
            // description: undefined,
          },
        }
        await assertOutputMatchesExpected(socketInstance, input, [output])
      })

      describe('AddEdge', () => {
        describe('When passed AddEdge and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
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
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed AddEdge and all nodes on the edge exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, firstInput, [firstOutput])
            const secondInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, secondInput, [secondOutput])
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorOutputMessage', async () => {
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
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'OutportNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              const firstInput: AddOutportInputMessageInput = {
                protocol: 'graph',
                command: 'addoutport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someport',
                  metadata: {},
                },
              }
              const firstOutput: AddOutportOutputMessage = {
                protocol: 'graph',
                command: 'addoutport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someport',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, firstInput, [firstOutput])
              const secondInput: AddInportInputMessageInput = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'someothernode',
                  port: 'someotherport',
                  public: 'someotherport',
                  metadata: {},
                },
              }
              const secondOutput: AddInportOutputMessage = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'someothernode',
                  port: 'someotherport',
                  public: 'someotherport',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, secondInput, [secondOutput])
            })

            it('should return a AddEdgeOutputMessage', async () => {
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
              const output: AddEdgeOutputMessage = {
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
                  metadata: {
                    route: undefined,
                    schema: undefined,
                    secure: undefined,
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      describe('AddGroup', () => {
        describe('When passed AddGroup and a node in the group does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
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
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed AddGroup and all nodes in the group exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, firstInput, [firstOutput])
            const secondInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, secondInput, [secondOutput])
          })

          it('should return a AddGroupOutputMessage', async () => {
            const input: AddGroupInputMessageInput = {
              protocol: 'graph',
              command: 'addgroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
                nodes: [
                  'somenode',
                  'someothernode',
                ],
                metadata: {
                  description: 'foo',
                },
              },
            }
            const output: AddGroupOutputMessage = {
              protocol: 'graph',
              command: 'addgroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
                nodes: [
                  'somenode',
                  'someothernode',
                ],
                metadata: {
                  description: 'foo',
                },
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('AddInitial', () => {
        describe('When passed AddInitial and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
            const input: AddInitialInputMessageInput = {
              protocol: 'graph',
              command: 'addinitial',
              payload: {
                graph: 'foo',
                src: {
                  data: 'somedata',
                },
                tgt: {
                  node: 'somenode',
                  port: 'someport',
                },
                metadata: {},
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed AddInitial and all nodes in the group exist on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          describe('When passed AddInitial and an inport does not exist on the node', () => {
            it('should return an InportNotFound ErrorOutputMessage', async () => {
              const input: AddInitialInputMessageInput = {
                protocol: 'graph',
                command: 'addinitial',
                payload: {
                  graph: 'foo',
                  src: {
                    data: 'somedata',
                  },
                  tgt: {
                    node: 'somenode',
                    port: 'someport',
                  },
                  metadata: {},
                },
              }
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'InportNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When passed AddInitial and an inport exists on the node', () => {
            beforeEach(async () => {
              const input: AddInportInputMessageInput = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someport',
                  metadata: {},
                },
              }
              const output: AddInportOutputMessage = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someport',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(
                socketInstance,
                input,
                [
                  output,
                ],
              )
            })

            it('should return a AddInitialOutputMessage', async () => {
              const input: AddInitialInputMessageInput = {
                protocol: 'graph',
                command: 'addinitial',
                payload: {
                  graph: 'foo',
                  src: {
                    data: 'somedata',
                  },
                  tgt: {
                    node: 'somenode',
                    port: 'someport',
                  },
                  metadata: {},
                },
              }
              const output: AddInitialOutputMessage = {
                protocol: 'graph',
                command: 'addinitial',
                payload: {
                  graph: 'foo',
                  src: {
                    data: 'somedata',
                  },
                  tgt: {
                    node: 'somenode',
                    port: 'someport',
                  },
                  metadata: {
                    route: undefined,
                    schema: undefined,
                    secure: undefined,
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      describe('AddInport', () => {
        describe('When passed AddInport and a node does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
            const input: AddInportInputMessageInput = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed AddInport and the node exists on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a AddInportOutputMessage', async () => {
            const input: AddInportInputMessageInput = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: AddInportOutputMessage = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('AddNode', () => {
        describe('When passed AddNode', () => {
          it('should return a AddNodeOutputMessage', async () => {
            const input: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('AddOutport', () => {
        describe('When passed AddOutport and a node does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
            const input: AddOutportInputMessageInput = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed AddOutport and the node exists on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a AddOutportOutputMessage', async () => {
            const input: AddOutportInputMessageInput = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: AddOutportOutputMessage = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('ChangeEdge', () => {
        describe('When passed ChangeEdge and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
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
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed ChangeEdge and all nodes on the edge exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, firstInput, [firstOutput])
            const secondInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, secondInput, [secondOutput])
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorOutputMessage', async () => {
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
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'OutportNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              const firstInput: AddOutportInputMessageInput = {
                protocol: 'graph',
                command: 'addoutport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someport',
                  metadata: {},
                },
              }
              const firstOutput: AddOutportOutputMessage = {
                protocol: 'graph',
                command: 'addoutport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someport',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, firstInput, [firstOutput])
              const secondInput: AddInportInputMessageInput = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'someothernode',
                  port: 'someotherport',
                  public: 'someotherport',
                  metadata: {},
                },
              }
              const secondOutput: AddInportOutputMessage = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'someothernode',
                  port: 'someotherport',
                  public: 'someotherport',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, secondInput, [secondOutput])
            })

            it('should return a AddEdgeOutputMessage', async () => {
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
              const output: AddEdgeOutputMessage = {
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
                  metadata: {
                    route: undefined,
                    schema: undefined,
                    secure: undefined,
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      // TODO: nodes don't exist on the group, so can't check for node existence?
      describe('ChangeGroup', () => {
        describe('When passed ChangeGroup and the group does not exist on the graph', () => {
          it('should return a GroupNotFound ErrorOutputMessage', async () => {
            const input: ChangeGroupInputMessageInput = {
              protocol: 'graph',
              command: 'changegroup',
              payload: {
                graph: 'foo',
                name: 'somename',
                metadata: {
                  description: 'somedescription',
                },
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'GroupNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed ChangeGroup and the group exists on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
            await (async () => {
              const input: AddGroupInputMessageInput = {
                protocol: 'graph',
                command: 'addgroup',
                payload: {
                  graph: 'foo',
                  name: 'somegroup',
                  nodes: [
                    'somenode',
                    'someothernode',
                  ],
                  metadata: {
                    description: 'foo',
                  },
                },
              }
              const output: AddGroupOutputMessage = {
                protocol: 'graph',
                command: 'addgroup',
                payload: {
                  graph: 'foo',
                  name: 'somegroup',
                  nodes: [
                    'somenode',
                    'someothernode',
                  ],
                  metadata: {
                    description: 'foo',
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
          })

          it('should return a AddGroupOutputMessage', async () => {
            const input: ChangeGroupInputMessageInput = {
              protocol: 'graph',
              command: 'changegroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
                metadata: {
                  description: 'somedescription',
                },
              },
            }
            const output: ChangeGroupOutputMessage = {
              protocol: 'graph',
              command: 'changegroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
                metadata: {
                  description: 'somedescription',
                },
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('ChangeNode', () => {
        describe('When passed ChangeNode and the node does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
            const input: ChangeNodeInputMessageInput = {
              protocol: 'graph',
              command: 'changenode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                metadata: {},
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed ChangeNode and the node exists on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a ChangeNodeOutputMessage', async () => {
            const input: ChangeNodeInputMessageInput = {
              protocol: 'graph',
              command: 'changenode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                metadata: {
                  description: 'somedescription',
                },
              },
            }
            const output: ChangeNodeOutputMessage = {
              protocol: 'graph',
              command: 'changenode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                metadata: {
                  description: 'somedescription',
                },
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('RemoveEdge', () => {
        describe('When passed RemoveEdge and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorOutputMessage', async () => {
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
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RemoveEdge and all nodes on the edge exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, firstInput, [firstOutput])
            const secondInput: AddNodeInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, secondInput, [secondOutput])
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorOutputMessage', async () => {
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
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'OutportNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              await (async () => {
                const input: AddOutportInputMessageInput = {
                  protocol: 'graph',
                  command: 'addoutport',
                  payload: {
                    graph: 'foo',
                    node: 'somenode',
                    port: 'someport',
                    public: 'someport',
                    metadata: {},
                  },
                }
                const output: AddOutportOutputMessage = {
                  protocol: 'graph',
                  command: 'addoutport',
                  payload: {
                    graph: 'foo',
                    node: 'somenode',
                    port: 'someport',
                    public: 'someport',
                    metadata: {},
                  },
                }
                await assertOutputMatchesExpected(socketInstance, input, [output])
              })()

              await (async () => {
                const input: AddInportInputMessageInput = {
                  protocol: 'graph',
                  command: 'addinport',
                  payload: {
                    graph: 'foo',
                    node: 'someothernode',
                    port: 'someotherport',
                    public: 'someotherport',
                    metadata: {},
                  },
                }
                const output: AddInportOutputMessage = {
                  protocol: 'graph',
                  command: 'addinport',
                  payload: {
                    graph: 'foo',
                    node: 'someothernode',
                    port: 'someotherport',
                    public: 'someotherport',
                    metadata: {},
                  },
                }
                await assertOutputMatchesExpected(socketInstance, input, [output])
              })()

              await (async () => {
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
                const output: AddEdgeOutputMessage = {
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
                    metadata: {
                      route: undefined,
                      schema: undefined,
                      secure: undefined,
                    },
                  },
                }
                await assertOutputMatchesExpected(socketInstance, input, [output])
              })()
            })

            it('should return a RemoveEdgeOutputMessage', async () => {
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
              const output: RemoveEdgeOutputMessage = {
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
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      describe('RemoveGroup', () => {
        describe('When passed RemoveGroup and the group does not exist on the graph', () => {
          it('should return a GroupNotFound ErrorOutputMessage', async () => {
            const input: RemoveGroupInputMessageInput = {
              protocol: 'graph',
              command: 'removegroup',
              payload: {
                graph: 'foo',
                name: 'somename',
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'GroupNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RemoveGroup and the group exists on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
            await (async () => {
              const input: AddGroupInputMessageInput = {
                protocol: 'graph',
                command: 'addgroup',
                payload: {
                  graph: 'foo',
                  name: 'somegroup',
                  nodes: [
                    'somenode',
                    'someothernode',
                  ],
                  metadata: {
                    description: 'foo',
                  },
                },
              }
              const output: AddGroupOutputMessage = {
                protocol: 'graph',
                command: 'addgroup',
                payload: {
                  graph: 'foo',
                  name: 'somegroup',
                  nodes: [
                    'somenode',
                    'someothernode',
                  ],
                  metadata: {
                    description: 'foo',
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
          })

          it('should return a RemoveGroupOutputMessage', async () => {
            const input: RemoveGroupInputMessageInput = {
              protocol: 'graph',
              command: 'removegroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
              },
            }
            const output: RemoveGroupOutputMessage = {
              protocol: 'graph',
              command: 'removegroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('RemoveInitial', () => {
        describe('When passed RemoveInitial and a node on the edge does not exist on the graph', () => {
          it('should return a IIPNotFound ErrorOutputMessage', async () => {
            const input: RemoveInitialInputMessageInput = {
              protocol: 'graph',
              command: 'removeinitial',
              payload: {
                graph: 'foo',
                src: undefined,
                tgt: {
                  node: 'somenode',
                  port: 'someport',
                },
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'IIPNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RemoveInitial and all nodes in the group exist on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
            await (async () => {
              const input: AddInportInputMessageInput = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someotherport',
                  metadata: {},
                },
              }
              const output: AddInportOutputMessage = {
                protocol: 'graph',
                command: 'addinport',
                payload: {
                  graph: 'foo',
                  node: 'somenode',
                  port: 'someport',
                  public: 'someotherport',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
          })

          describe('When passed RemoveInitial and an inport does not exist on the node', () => {
            it('should return an InportNotFound ErrorOutputMessage', async () => {
              const input: AddInitialInputMessageInput = {
                protocol: 'graph',
                command: 'addinitial',
                payload: {
                  graph: 'foo',
                  src: {
                    data: 'somedata',
                  },
                  tgt: {
                    node: 'somenode',
                    port: 'someport',
                  },
                  metadata: {},
                },
              }
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'InportNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When passed RemoveInitial and an inport exists on the node', () => {
            beforeEach(async () => {
              await (async () => {
                const input: AddInportInputMessageInput = {
                  protocol: 'graph',
                  command: 'addinport',
                  payload: {
                    graph: 'foo',
                    node: 'somenode',
                    port: 'someport',
                    public: 'someport',
                    metadata: {},
                  },
                }
                const output: AddInportOutputMessage = {
                  protocol: 'graph',
                  command: 'addinport',
                  payload: {
                    graph: 'foo',
                    node: 'somenode',
                    port: 'someport',
                    public: 'someport',
                    metadata: {},
                  },
                }
                await assertOutputMatchesExpected(socketInstance, input, [output])
              })()
              await (async () => {
                const input: AddInitialInputMessageInput = {
                  protocol: 'graph',
                  command: 'addinitial',
                  payload: {
                    graph: 'foo',
                    src: {
                      data: 'somedata',
                    },
                    tgt: {
                      node: 'somenode',
                      port: 'someport',
                    },
                    metadata: {},
                  },
                }
                const output: AddInitialOutputMessage = {
                  protocol: 'graph',
                  command: 'addinitial',
                  payload: {
                    graph: 'foo',
                    src: {
                      data: 'somedata',
                    },
                    tgt: {
                      node: 'somenode',
                      port: 'someport',
                    },
                    metadata: {
                      route: undefined,
                      schema: undefined,
                      secure: undefined,
                    },
                  },
                }
                await assertOutputMatchesExpected(socketInstance, input, [output])
              })()
            })

            it('should return a RemoveInitialOutputMessage', async () => {
              const input: RemoveInitialInputMessageInput = {
                protocol: 'graph',
                command: 'removeinitial',
                payload: {
                  graph: 'foo',
                  src: undefined,
                  tgt: {
                    node: 'somenode',
                    port: 'someport',
                  },
                },
              }
              const output: RemoveInitialOutputMessage = {
                protocol: 'graph',
                command: 'removeinitial',
                payload: {
                  graph: 'foo',
                  src: undefined,
                  tgt: {
                    node: 'somenode',
                    port: 'someport',
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      describe('RemoveInport', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveInport and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorOutputMessage', async () => {
        //     const input: RemoveInportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeinport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(socketInstance, input, [output])
        //   })
        // })

        // describe('When passed RemoveInport and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(socketInstance, input, [output])
        })

        describe('When passed RemoveInport and the Inport does not exist on the node', () => {
          it('should return a InportNotFound ErrorOutputMessage', async () => {
            const input: RemoveInportInputMessageInput = {
              protocol: 'graph',
              command: 'removeinport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'InportNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RemoveInport and the Inport exists on the node', () => {
          beforeEach(async () => {
            const input: AddInportInputMessageInput = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: AddInportOutputMessage = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a RemoveInportOutputMessage', async () => {
            const input: RemoveInportInputMessageInput = {
              protocol: 'graph',
              command: 'removeinport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: RemoveInportOutputMessage = {
              protocol: 'graph',
              command: 'removeinport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
        // })
      })

      describe('RemoveNode', () => {
        describe('When passed RemoveNode', () => {
          describe('When the Node does not exist on the graph', () => {
            it('should return a NodeNotFound ErrorOutputMessage', async () => {
              const input: RemoveNodeInputMessageInput = {
                protocol: 'graph',
                command: 'removenode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                },
              }
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NodeNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When the Node exists on the graph', () => {
            beforeEach(async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })

            it('should return a RemoveNodeOutputMessage', async () => {
              const input: RemoveNodeInputMessageInput = {
                protocol: 'graph',
                command: 'removenode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                },
              }
              const output: RemoveNodeOutputMessage = {
                protocol: 'graph',
                command: 'removenode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      describe('RemoveOutport', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveOutport and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorOutputMessage', async () => {
        //     const input: RemoveOutportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeoutport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(socketInstance, input, [output])
        //   })
        // })

        // describe('When passed RemoveOutport and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(socketInstance, input, [output])
        })

        describe('When passed RemoveOutport and the Outport does not exist on the node', () => {
          it('should return a OutportNotFound ErrorOutputMessage', async () => {
            const input: RemoveOutportInputMessageInput = {
              protocol: 'graph',
              command: 'removeoutport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'OutportNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RemoveOutport and the Outport exists on the node', () => {
          beforeEach(async () => {
            const input: AddOutportInputMessageInput = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: AddOutportOutputMessage = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a RemoveOutportOutputMessage', async () => {
            const input: RemoveOutportInputMessageInput = {
              protocol: 'graph',
              command: 'removeoutport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: RemoveOutportOutputMessage = {
              protocol: 'graph',
              command: 'removeoutport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
        // })
      })

      describe('RenameGroup', () => {
        describe('When passed RenameGroup and the group does not exist on the graph', () => {
          it('should return a GroupNotFound ErrorOutputMessage', async () => {
            const input: RenameGroupInputMessageInput = {
              protocol: 'graph',
              command: 'renamegroup',
              payload: {
                graph: 'foo',
                from: 'somegroup',
                to: 'someothergroup',
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'GroupNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RenameGroup and the group exist on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()

            await (async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()

            await (async () => {
              const input: AddGroupInputMessageInput = {
                protocol: 'graph',
                command: 'addgroup',
                payload: {
                  graph: 'foo',
                  name: 'somegroup',
                  nodes: [
                    'somenode',
                    'someothernode',
                  ],
                  metadata: {
                    description: 'foo',
                  },
                },
              }
              const output: AddGroupOutputMessage = {
                protocol: 'graph',
                command: 'addgroup',
                payload: {
                  graph: 'foo',
                  name: 'somegroup',
                  nodes: [
                    'somenode',
                    'someothernode',
                  ],
                  metadata: {
                    description: 'foo',
                  },
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })()
          })

          it('should return a RenameGroupOutputMessage', async () => {
            const input: RenameGroupInputMessageInput = {
              protocol: 'graph',
              command: 'renamegroup',
              payload: {
                graph: 'foo',
                from: 'somegroup',
                to: 'someothergroup',
              },
            }
            const output: RenameGroupOutputMessage = {
              protocol: 'graph',
              command: 'renamegroup',
              payload: {
                graph: 'foo',
                from: 'somegroup',
                to: 'someothergroup',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
      })

      describe('RenameInport', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveInport and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorOutputMessage', async () => {
        //     const input: RemoveInportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeinport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(socketInstance, input, [output])
        //   })
        // })

        // describe('When passed RemoveInport and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(socketInstance, input, [output])
        })

        describe('When passed RenameInport and the Inport does not exist on the node', () => {
          it('should return a InportNotFound ErrorOutputMessage', async () => {
            const input: RenameInportInputMessageInput = {
              protocol: 'graph',
              command: 'renameinport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'InportNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RenameInport and the Inport exists on the node', () => {
          beforeEach(async () => {
            const input: AddInportInputMessageInput = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: AddInportOutputMessage = {
              protocol: 'graph',
              command: 'addinport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a RenameInportOutputMessage', async () => {
            const input: RenameInportInputMessageInput = {
              protocol: 'graph',
              command: 'renameinport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: RenameInportOutputMessage = {
              protocol: 'graph',
              command: 'renameinport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
        // })
      })

      describe('RenameNode', () => {
        describe('When passed RenameNode', () => {
          describe('When the Node does not exist on the graph', () => {
            it('should return a NodeNotFound ErrorOutputMessage', async () => {
              const input: RenameNodeInputMessageInput = {
                protocol: 'graph',
                command: 'renamenode',
                payload: {
                  graph: 'foo',
                  from: 'somenode',
                  to: 'someothernode',
                },
              }
              const output: ErrorOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NodeNotFound',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })

          describe('When the Node exists on the graph', () => {
            beforeEach(async () => {
              const input: AddNodeInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })

            it('should return a RenameNodeOutputMessage', async () => {
              const input: RenameNodeInputMessageInput = {
                protocol: 'graph',
                command: 'renamenode',
                payload: {
                  graph: 'foo',
                  from: 'somenode',
                  to: 'someothernode',
                },
              }
              const output: RenameNodeOutputMessage = {
                protocol: 'graph',
                command: 'renamenode',
                payload: {
                  graph: 'foo',
                  from: 'somenode',
                  to: 'someothernode',
                },
              }
              await assertOutputMatchesExpected(socketInstance, input, [output])
            })
          })
        })
      })

      describe('RenameOutport', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveOutport and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorOutputMessage', async () => {
        //     const input: RemoveOutportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeoutport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(socketInstance, input, [output])
        //   })
        // })

        // describe('When passed RemoveOutport and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(socketInstance, input, [output])
        })

        describe('When passed RenameOutport and the Outport does not exist on the node', () => {
          it('should return a OutportNotFound ErrorOutputMessage', async () => {
            const input: RenameOutportInputMessageInput = {
              protocol: 'graph',
              command: 'renameoutport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: ErrorOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'OutportNotFound',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })

        describe('When passed RenameOutport and the Outport exists on the node', () => {
          beforeEach(async () => {
            const input: AddOutportInputMessageInput = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            const output: AddOutportOutputMessage = {
              protocol: 'graph',
              command: 'addoutport',
              payload: {
                graph: 'foo',
                node: 'somenode',
                port: 'someport',
                public: 'someport',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })

          it('should return a RenameOutportOutputMessage', async () => {
            const input: RenameOutportInputMessageInput = {
              protocol: 'graph',
              command: 'renameoutport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: RenameOutportOutputMessage = {
              protocol: 'graph',
              command: 'renameoutport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            await assertOutputMatchesExpected(socketInstance, input, [output])
          })
        })
        // })
      })
    })
  })
})
