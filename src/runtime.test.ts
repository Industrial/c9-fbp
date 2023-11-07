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

  chai.expect(resultJSON).to.deep.equal(currentExpectation)

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
        await assertOutputMatchesExpected(
          socketInstance,
          {
            protocol: 'runtime',
            command: 'getruntime',
            payload: {},
          } as GetRuntimeInputMessageInput,
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
            await assertOutputMatchesExpected(
              socketInstance,
              {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              } as AddNodeInputMessageInput,
              [
                {
                  protocol: 'graph',
                  command: 'addnode',
                  payload: {
                    graph: 'foo',
                    id: 'somenode',
                    component: 'somecomponent',
                    metadata: {},
                  },
                } as AddNodeOutputMessage,
              ],
            )
            await assertOutputMatchesExpected(
              socketInstance,
              {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              } as AddNodeInputMessageInput,
              [
                {
                  protocol: 'graph',
                  command: 'addnode',
                  payload: {
                    graph: 'foo',
                    id: 'someothernode',
                    component: 'someothercomponent',
                    metadata: {},
                  },
                } as AddNodeOutputMessage,
              ],
            )
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorOutputMessage', async () => {
              await assertOutputMatchesExpected(
                socketInstance,
                {
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
                } as AddEdgeInputMessageInput,
                [
                  {
                    protocol: 'graph',
                    command: 'error',
                    payload: {
                      message: 'OutportNotFound',
                    },
                  },
                ],
              )
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              await assertOutputMatchesExpected(
                socketInstance,
                {
                  protocol: 'graph',
                  command: 'addoutport',
                  payload: {
                    graph: 'foo',
                    node: 'somenode',
                    port: 'someport',
                    public: 'someport',
                    metadata: {},
                  },
                } as AddOutportInputMessageInput,
                [
                  {
                    protocol: 'graph',
                    command: 'addoutport',
                    payload: {
                      graph: 'foo',
                      node: 'somenode',
                      port: 'someport',
                      public: 'someport',
                      metadata: {},
                    },
                  } as AddOutportOutputMessage,
                ],
              )

              await assertOutputMatchesExpected(
                socketInstance,
                {
                  protocol: 'graph',
                  command: 'addinport',
                  payload: {
                    graph: 'foo',
                    node: 'someothernode',
                    port: 'someotherport',
                    public: 'someotherport',
                    metadata: {},
                  },
                } as AddInportInputMessageInput,
                [
                  {
                    protocol: 'graph',
                    command: 'addinport',
                    payload: {
                      graph: 'foo',
                      node: 'someothernode',
                      port: 'someotherport',
                      public: 'someotherport',
                      metadata: {},
                    },
                  } as AddInportOutputMessage,
                ],
              )
            })

            it('should return a AddEdgeOutputMessage', async () => {
              await assertOutputMatchesExpected(
                socketInstance,
                {
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
                } as AddEdgeInputMessageInput,
                [
                  {
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
                  } as AddEdgeOutputMessage,
                ],
              )
            })
          })
        })
      })

      describe('AddGroup', () => {
        describe('When passed AddGroup and a node on the edge does not exist on the graph', () => {
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
              await assertOutputMatchesExpected(
                socketInstance,
                input,
                [
                  {
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
                  },
                ],
              )
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

      describe('AddOutport', () => {
        // describe('When passed AddOutport and no node exists for the outport', () => {
        //   it('should return an NodeNotFound ErrorOutputMessage', async () => {
        //     const input: AddOutportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'addoutport',
        //       payload: {
        //         graph: 'foo',
        //         node: 'somenode',
        //         port: 'someport',
        //         public: 'someport',
        //         metadata: {
        //           description: 'somedescription',
        //         },
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NodeNotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('ChangeEdge', () => {
        // // TODO: An edge has a source an a target but when I pass ChangeEdge,
        // // where is the information that changes either the source or the
        // // target?
        // describe('When passed ChangeEdge and no node exists for the edge', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: ChangeEdgeInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'changeedge',
        //       payload: {
        //         graph: 'foo',
        //         src: {
        //           node: 'somenode',
        //           port: 'someport',
        //         },
        //         tgt: {
        //           node: 'someothernode',
        //           port: 'someotherport',
        //         },
        //         metadata: {},
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NodeNotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('ChangeGroup', () => {
        // describe('When passed ChangeGroup and AddNode has not been passed', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: ChangeGroupInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'changegroup',
        //       payload: {
        //         name: 'foo',
        //         graph: 'foo',
        //         metadata: {
        //           description: 'foo',
        //         },
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NodeNotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('ChangeNode', () => {
        // describe('ChangeNode', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: ChangeEdgeInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'changeedge',
        //       payload: {
        //         graph: 'foo',
        //         src: {
        //           node: 'foo',
        //           port: 'foo',
        //         },
        //         tgt: {
        //           node: 'bar',
        //           port: 'bar',
        //         },
        //         metadata: {},
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RemoveEdge', () => {
        // describe('RemoveEdge', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RemoveEdgeInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeedge',
        //       payload: {
        //         graph: 'foo',
        //         src: {
        //           node: 'somenode',
        //           port: 'someport',
        //         },
        //         tgt: {
        //           node: 'someothernode',
        //           port: 'someotherport',
        //         },
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RemoveGroup', () => {
        // describe('RemoveGroup', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RemoveGroupInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removegroup',
        //       payload: {
        //         graph: 'foo',
        //         name: 'foo',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RemoveInitial', () => {
        // describe('RemoveInitial', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RemoveInitialInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeinitial',
        //       payload: {
        //         graph: 'foo',
        //         src: {
        //           data: 'test',
        //         },
        //         tgt: {
        //           node: 'someothernode',
        //           port: 'someotherport',
        //         },
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RemoveInport', () => {
        // describe('RemoveInport', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RemoveInportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeinport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RemoveNode', () => {
        // describe('RemoveNode', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RemoveNodeInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removenode',
        //       payload: {
        //         graph: 'foo',
        //         id: 'foo',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RemoveOutport', () => {
        // describe('RemoveOutport', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RemoveOutportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeoutport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RenameGroup', () => {
        // describe('RenameGroup', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RenameGroupInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'renamegroup',
        //       payload: {
        //         graph: 'foo',
        //         from: 'foo',
        //         to: 'bar',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RenameInport', () => {
        // describe('RenameInport', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RenameInportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'renameinport',
        //       payload: {
        //         graph: 'foo',
        //         from: 'someport',
        //         to: 'someotherport',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RenameNode', () => {
        // describe('RenameNode', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RenameNodeInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'renamenode',
        //       payload: {
        //         graph: 'foo',
        //         from: 'foo',
        //         to: 'bar',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })

      describe('RenameOutport', () => {
        // describe('RenameOutport', () => {
        //   it('should return an ErrorOutputMessage', async () => {
        //     const input: RenameOutportInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'renameinport',
        //       payload: {
        //         graph: 'foo',
        //         from: 'someport',
        //         to: 'someotherport',
        //       },
        //     }
        //     await assertOutputMatchesExpected(
        //       socketInstance,
        //       input,
        //       [
        //         {
        //           protocol: 'graph',
        //           command: 'error',
        //           payload: {
        //             message: 'NotFound',
        //           },
        //         },
        //       ],
        //     )
        //   })
        // })
      })
    })
  })
})