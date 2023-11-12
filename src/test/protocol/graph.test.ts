import { AddEdgeGraphInputMessageInput } from '#/schemas/messages/graph/input/AddEdgeGraphInputMessage.ts'
import { AddEdgeGraphOutputMessage } from '#/schemas/messages/graph/output/AddEdgeGraphOutputMessage.ts'
import { AddGroupGraphInputMessageInput } from '#/schemas/messages/graph/input/AddGroupGraphInputMessage.ts'
import { AddGroupGraphOutputMessage } from '#/schemas/messages/graph/output/AddGroupGraphOutputMessage.ts'
import { AddInitialGraphInputMessageInput } from '#/schemas/messages/graph/input/AddInitialGraphInputMessage.ts'
import { AddInitialGraphOutputMessage } from '#/schemas/messages/graph/output/AddInitialGraphOutputMessage.ts'
import { AddInportGraphInputMessageInput } from '#/schemas/messages/graph/input/AddInportGraphInputMessage.ts'
import { AddInportGraphOutputMessage } from '#/schemas/messages/graph/output/AddInportGraphOutputMessage.ts'
import { AddNodeGraphInputMessageInput } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddNodeGraphOutputMessage } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { AddOutportGraphInputMessageInput } from '#/schemas/messages/graph/input/AddOutportGraphInputMessage.ts'
import { AddOutportGraphOutputMessage } from '#/schemas/messages/graph/output/AddOutportGraphOutputMessage.ts'
import { ChangeEdgeGraphInputMessageInput } from '#/schemas/messages/graph/input/ChangeEdgeGraphInputMessage.ts'
import { ChangeGroupGraphInputMessageInput } from '#/schemas/messages/graph/input/ChangeGroupGraphInputMessage.ts'
import { ChangeGroupGraphOutputMessage } from '#/schemas/messages/graph/output/ChangeGroupGraphOutputMessage.ts'
import { ChangeNodeGraphInputMessageInput } from '#/schemas/messages/graph/input/ChangeNodeGraphInputMessage.ts'
import { ChangeNodeGraphOutputMessage } from '#/schemas/messages/graph/output/ChangeNodeGraphOutputMessage.ts'
import { ClearGraphInputMessageInput } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ErrorGraphOutputMessage } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveEdgeGraphInputMessageInput } from '#/schemas/messages/graph/input/RemoveEdgeGraphInputMessage.ts'
import { RemoveEdgeGraphOutputMessage } from '#/schemas/messages/graph/output/RemoveEdgeGraphOutputMessage.ts'
import { RemoveGroupGraphInputMessageInput } from '#/schemas/messages/graph/input/RemoveGroupGraphInputMessage.ts'
import { RemoveGroupGraphOutputMessage } from '#/schemas/messages/graph/output/RemoveGroupGraphOutputMessage.ts'
import { RemoveInitialGraphInputMessageInput } from '#/schemas/messages/graph/input/RemoveInitialGraphInputMessage.ts'
import { RemoveInitialGraphOutputMessage } from '#/schemas/messages/graph/output/RemoveInitialGraphOutputMessage.ts'
import { RemoveInportGraphInputMessageInput } from '#/schemas/messages/graph/input/RemoveInportGraphInputMessage.ts'
import { RemoveInportGraphOutputMessage } from '#/schemas/messages/graph/output/RemoveInportGraphOutputMessage.ts'
import { RemoveNodeGraphInputMessageInput } from '#/schemas/messages/graph/input/RemoveNodeGraphInputMessage.ts'
import { RemoveNodeGraphOutputMessage } from '#/schemas/messages/graph/output/RemoveNodeGraphOutputMessage.ts'
import { RemoveOutportGraphInputMessageInput } from '#/schemas/messages/graph/input/RemoveOutportGraphInputMessage.ts'
import { RemoveOutportGraphOutputMessage } from '#/schemas/messages/graph/output/RemoveOutportGraphOutputMessage.ts'
import { RenameGroupGraphInputMessageInput } from '#/schemas/messages/graph/input/RenameGroupGraphInputMessage.ts'
import { RenameGroupGraphOutputMessage } from '#/schemas/messages/graph/output/RenameGroupGraphOutputMessage.ts'
import { RenameInportGraphInputMessageInput } from '#/schemas/messages/graph/input/RenameInportGraphInputMessage.ts'
import { RenameInportGraphOutputMessage } from '#/schemas/messages/graph/output/RenameInportGraphOutputMessage.ts'
import { RenameNodeGraphInputMessageInput } from '#/schemas/messages/graph/input/RenameNodeGraphInputMessage.ts'
import { RenameNodeGraphOutputMessage } from '#/schemas/messages/graph/output/RenameNodeGraphOutputMessage.ts'
import { RenameOutportGraphInputMessageInput } from '#/schemas/messages/graph/input/RenameOutportGraphInputMessage.ts'
import { RenameOutportGraphOutputMessage } from '#/schemas/messages/graph/output/RenameOutportGraphOutputMessage.ts'
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

  describe('Graph Protocol', () => {
    describe('When no ClearGraph has been passed', () => {
      it('should return a GraphNotFound ErrorGraphOutputMessage', async () => {
        const input: AddNodeGraphInputMessageInput = {
          protocol: 'graph',
          command: 'addnode',
          payload: {
            component: 'foo',
            graph: 'foo',
            id: 'foo',
            metadata: {},
          },
        }
        const output: ErrorGraphOutputMessage = {
          protocol: 'graph',
          command: 'error',
          payload: {
            message: 'GraphNotFound',
          },
        }
        await assertOutputMatchesExpected(input, [output])
      })
    })

    describe('When ClearGraph has been passed', () => {
      beforeEach(async () => {
        const input: ClearGraphInputMessageInput = {
          protocol: 'graph',
          command: 'clear',
          payload: {
            id: 'foo',
            name: 'foo',
            main: true,
          },
        }
        // Don't use the ClearGraphOutputMessage type here because it includes
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
        await assertOutputMatchesExpected(input, [output])
      })

      describe('AddEdgeGraph', () => {
        describe('When passed AddEdgeGraph and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: AddEdgeGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed AddEdgeGraph and all nodes on the edge exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(firstInput, [firstOutput])
            const secondInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(secondInput, [secondOutput])
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorGraphOutputMessage', async () => {
              const input: AddEdgeGraphInputMessageInput = {
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
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'OutportNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              const firstInput: AddOutportGraphInputMessageInput = {
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
              const firstOutput: AddOutportGraphOutputMessage = {
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
              await assertOutputMatchesExpected(firstInput, [firstOutput])
              const secondInput: AddInportGraphInputMessageInput = {
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
              const secondOutput: AddInportGraphOutputMessage = {
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
              await assertOutputMatchesExpected(secondInput, [secondOutput])
            })

            it('should return a AddEdgeGraphOutputMessage', async () => {
              const input: AddEdgeGraphInputMessageInput = {
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
              const output: AddEdgeGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      describe('AddGroupGraph', () => {
        describe('When passed AddGroupGraph and a node in the group does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: AddGroupGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed AddGroupGraph and all nodes in the group exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(firstInput, [firstOutput])
            const secondInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(secondInput, [secondOutput])
          })

          it('should return a AddGroupGraphOutputMessage', async () => {
            const input: AddGroupGraphInputMessageInput = {
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
            const output: AddGroupGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('AddInitialGraph', () => {
        describe('When passed AddInitialGraph and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: AddInitialGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed AddInitialGraph and all nodes in the group exist on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })

          describe('When passed AddInitialGraph and an inport does not exist on the node', () => {
            it('should return an InportNotFound ErrorGraphOutputMessage', async () => {
              const input: AddInitialGraphInputMessageInput = {
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
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'InportNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When passed AddInitialGraph and an inport exists on the node', () => {
            beforeEach(async () => {
              const input: AddInportGraphInputMessageInput = {
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
              const output: AddInportGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })

            it('should return a AddInitialGraphOutputMessage', async () => {
              const input: AddInitialGraphInputMessageInput = {
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
              const output: AddInitialGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      describe('AddInportGraph', () => {
        describe('When passed AddInportGraph and a node does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: AddInportGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed AddInportGraph and the node exists on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a AddInportGraphOutputMessage', async () => {
            const input: AddInportGraphInputMessageInput = {
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
            const output: AddInportGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('AddNode', () => {
        describe('When passed AddNode', () => {
          it('should return a AddNodeGraphOutputMessage', async () => {
            const input: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('AddOutportGraph', () => {
        describe('When passed AddOutportGraph and a node does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: AddOutportGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed AddOutportGraph and the node exists on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a AddOutportGraphOutputMessage', async () => {
            const input: AddOutportGraphInputMessageInput = {
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
            const output: AddOutportGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('ChangeEdgeGraph', () => {
        describe('When passed ChangeEdgeGraph and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: ChangeEdgeGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed ChangeEdgeGraph and all nodes on the edge exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(firstInput, [firstOutput])
            const secondInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(secondInput, [secondOutput])
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorGraphOutputMessage', async () => {
              const input: ChangeEdgeGraphInputMessageInput = {
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
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'OutportNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              const firstInput: AddOutportGraphInputMessageInput = {
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
              const firstOutput: AddOutportGraphOutputMessage = {
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
              await assertOutputMatchesExpected(firstInput, [firstOutput])
              const secondInput: AddInportGraphInputMessageInput = {
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
              const secondOutput: AddInportGraphOutputMessage = {
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
              await assertOutputMatchesExpected(secondInput, [secondOutput])
            })

            it('should return a AddEdgeGraphOutputMessage', async () => {
              const input: AddEdgeGraphInputMessageInput = {
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
              const output: AddEdgeGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      // TODO: nodes don't exist on the group, so can't check for node existence?
      describe('ChangeGroupGraph', () => {
        describe('When passed ChangeGroupGraph and the group does not exist on the graph', () => {
          it('should return a GroupNotFound ErrorGraphOutputMessage', async () => {
            const input: ChangeGroupGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'GroupNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed ChangeGroupGraph and the group exists on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()
            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()
            await (async () => {
              const input: AddGroupGraphInputMessageInput = {
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
              const output: AddGroupGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })()
          })

          it('should return a AddGroupGraphOutputMessage', async () => {
            const input: ChangeGroupGraphInputMessageInput = {
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
            const output: ChangeGroupGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('ChangeNode', () => {
        describe('When passed ChangeNode and the node does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: ChangeNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'changenode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                metadata: {},
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed ChangeNode and the node exists on the graph', () => {
          beforeEach(async () => {
            const input: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const output: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a ChangeNodeGraphOutputMessage', async () => {
            const input: ChangeNodeGraphInputMessageInput = {
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
            const output: ChangeNodeGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('RemoveEdgeGraph', () => {
        describe('When passed RemoveEdgeGraph and a node on the edge does not exist on the graph', () => {
          it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
            const input: RemoveEdgeGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'NodeNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RemoveEdgeGraph and all nodes on the edge exist on the graph', () => {
          beforeEach(async () => {
            const firstInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            const firstOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'somenode',
                component: 'somecomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(firstInput, [firstOutput])
            const secondInput: AddNodeGraphInputMessageInput = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            const secondOutput: AddNodeGraphOutputMessage = {
              protocol: 'graph',
              command: 'addnode',
              payload: {
                graph: 'foo',
                id: 'someothernode',
                component: 'someothercomponent',
                metadata: {},
              },
            }
            await assertOutputMatchesExpected(secondInput, [secondOutput])
          })

          describe('When a port on the edge does not exist on a node', () => {
            it('should return a OutportNotFound ErrorGraphOutputMessage', async () => {
              const input: RemoveEdgeGraphInputMessageInput = {
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
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'OutportNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When all ports on the edge exist on the nodes', () => {
            beforeEach(async () => {
              await (async () => {
                const input: AddOutportGraphInputMessageInput = {
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
                const output: AddOutportGraphOutputMessage = {
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
                await assertOutputMatchesExpected(input, [output])
              })()

              await (async () => {
                const input: AddInportGraphInputMessageInput = {
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
                const output: AddInportGraphOutputMessage = {
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
                await assertOutputMatchesExpected(input, [output])
              })()

              await (async () => {
                const input: AddEdgeGraphInputMessageInput = {
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
                const output: AddEdgeGraphOutputMessage = {
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
                await assertOutputMatchesExpected(input, [output])
              })()
            })

            it('should return a RemoveEdgeGraphOutputMessage', async () => {
              const input: RemoveEdgeGraphInputMessageInput = {
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
              const output: RemoveEdgeGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      describe('RemoveGroupGraph', () => {
        describe('When passed RemoveGroupGraph and the group does not exist on the graph', () => {
          it('should return a GroupNotFound ErrorGraphOutputMessage', async () => {
            const input: RemoveGroupGraphInputMessageInput = {
              protocol: 'graph',
              command: 'removegroup',
              payload: {
                graph: 'foo',
                name: 'somename',
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'GroupNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RemoveGroupGraph and the group exists on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()
            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()
            await (async () => {
              const input: AddGroupGraphInputMessageInput = {
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
              const output: AddGroupGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })()
          })

          it('should return a RemoveGroupGraphOutputMessage', async () => {
            const input: RemoveGroupGraphInputMessageInput = {
              protocol: 'graph',
              command: 'removegroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
              },
            }
            const output: RemoveGroupGraphOutputMessage = {
              protocol: 'graph',
              command: 'removegroup',
              payload: {
                graph: 'foo',
                name: 'somegroup',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('RemoveInitialGraph', () => {
        describe('When passed RemoveInitialGraph and a node on the edge does not exist on the graph', () => {
          it('should return a IIPNotFound ErrorGraphOutputMessage', async () => {
            const input: RemoveInitialGraphInputMessageInput = {
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
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'IIPNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RemoveInitialGraph and all nodes in the group exist on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()
            await (async () => {
              const input: AddInportGraphInputMessageInput = {
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
              const output: AddInportGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })()
          })

          describe('When passed RemoveInitialGraph and an inport does not exist on the node', () => {
            it('should return an InportNotFound ErrorGraphOutputMessage', async () => {
              const input: AddInitialGraphInputMessageInput = {
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
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'InportNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When passed RemoveInitialGraph and an inport exists on the node', () => {
            beforeEach(async () => {
              await (async () => {
                const input: AddInportGraphInputMessageInput = {
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
                const output: AddInportGraphOutputMessage = {
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
                await assertOutputMatchesExpected(input, [output])
              })()
              await (async () => {
                const input: AddInitialGraphInputMessageInput = {
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
                const output: AddInitialGraphOutputMessage = {
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
                await assertOutputMatchesExpected(input, [output])
              })()
            })

            it('should return a RemoveInitialGraphOutputMessage', async () => {
              const input: RemoveInitialGraphInputMessageInput = {
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
              const output: RemoveInitialGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      describe('RemoveInportGraph', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveInportGraph and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
        //     const input: RemoveInportGraphInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeinport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorGraphOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(input, [output])
        //   })
        // })

        // describe('When passed RemoveInportGraph and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeGraphInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeGraphOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(input, [output])
        })

        describe('When passed RemoveInportGraph and the Inport does not exist on the node', () => {
          it('should return a InportNotFound ErrorGraphOutputMessage', async () => {
            const input: RemoveInportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'removeinport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'InportNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RemoveInportGraph and the Inport exists on the node', () => {
          beforeEach(async () => {
            const input: AddInportGraphInputMessageInput = {
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
            const output: AddInportGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a RemoveInportGraphOutputMessage', async () => {
            const input: RemoveInportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'removeinport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: RemoveInportGraphOutputMessage = {
              protocol: 'graph',
              command: 'removeinport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
        // })
      })

      describe('RemoveNode', () => {
        describe('When passed RemoveNode', () => {
          describe('When the Node does not exist on the graph', () => {
            it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
              const input: RemoveNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'removenode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                },
              }
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NodeNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When the Node exists on the graph', () => {
            beforeEach(async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })

            it('should return a RemoveNodeGraphOutputMessage', async () => {
              const input: RemoveNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'removenode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                },
              }
              const output: RemoveNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'removenode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      describe('RemoveOutportGraph', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveOutportGraph and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
        //     const input: RemoveOutportGraphInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeoutport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorGraphOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(input, [output])
        //   })
        // })

        // describe('When passed RemoveOutportGraph and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeGraphInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeGraphOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(input, [output])
        })

        describe('When passed RemoveOutportGraph and the Outport does not exist on the node', () => {
          it('should return a OutportNotFound ErrorGraphOutputMessage', async () => {
            const input: RemoveOutportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'removeoutport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'OutportNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RemoveOutportGraph and the Outport exists on the node', () => {
          beforeEach(async () => {
            const input: AddOutportGraphInputMessageInput = {
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
            const output: AddOutportGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a RemoveOutportGraphOutputMessage', async () => {
            const input: RemoveOutportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'removeoutport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            const output: RemoveOutportGraphOutputMessage = {
              protocol: 'graph',
              command: 'removeoutport',
              payload: {
                graph: 'foo',
                public: 'someport',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
        // })
      })

      describe('RenameGroupGraph', () => {
        describe('When passed RenameGroupGraph and the group does not exist on the graph', () => {
          it('should return a GroupNotFound ErrorGraphOutputMessage', async () => {
            const input: RenameGroupGraphInputMessageInput = {
              protocol: 'graph',
              command: 'renamegroup',
              payload: {
                graph: 'foo',
                from: 'somegroup',
                to: 'someothergroup',
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'GroupNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RenameGroupGraph and the group exist on the graph', () => {
          beforeEach(async () => {
            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()

            await (async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'someothernode',
                  component: 'someothercomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })()

            await (async () => {
              const input: AddGroupGraphInputMessageInput = {
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
              const output: AddGroupGraphOutputMessage = {
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
              await assertOutputMatchesExpected(input, [output])
            })()
          })

          it('should return a RenameGroupGraphOutputMessage', async () => {
            const input: RenameGroupGraphInputMessageInput = {
              protocol: 'graph',
              command: 'renamegroup',
              payload: {
                graph: 'foo',
                from: 'somegroup',
                to: 'someothergroup',
              },
            }
            const output: RenameGroupGraphOutputMessage = {
              protocol: 'graph',
              command: 'renamegroup',
              payload: {
                graph: 'foo',
                from: 'somegroup',
                to: 'someothergroup',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
      })

      describe('RenameInportGraph', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveInportGraph and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
        //     const input: RemoveInportGraphInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeinport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorGraphOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(input, [output])
        //   })
        // })

        // describe('When passed RemoveInportGraph and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeGraphInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeGraphOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(input, [output])
        })

        describe('When passed RenameInportGraph and the Inport does not exist on the node', () => {
          it('should return a InportNotFound ErrorGraphOutputMessage', async () => {
            const input: RenameInportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'renameinport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'InportNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RenameInportGraph and the Inport exists on the node', () => {
          beforeEach(async () => {
            const input: AddInportGraphInputMessageInput = {
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
            const output: AddInportGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a RenameInportGraphOutputMessage', async () => {
            const input: RenameInportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'renameinport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: RenameInportGraphOutputMessage = {
              protocol: 'graph',
              command: 'renameinport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
        // })
      })

      describe('RenameNode', () => {
        describe('When passed RenameNode', () => {
          describe('When the Node does not exist on the graph', () => {
            it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
              const input: RenameNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'renamenode',
                payload: {
                  graph: 'foo',
                  from: 'somenode',
                  to: 'someothernode',
                },
              }
              const output: ErrorGraphOutputMessage = {
                protocol: 'graph',
                command: 'error',
                payload: {
                  message: 'NodeNotFound',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })

          describe('When the Node exists on the graph', () => {
            beforeEach(async () => {
              const input: AddNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              const output: AddNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'addnode',
                payload: {
                  graph: 'foo',
                  id: 'somenode',
                  component: 'somecomponent',
                  metadata: {},
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })

            it('should return a RenameNodeGraphOutputMessage', async () => {
              const input: RenameNodeGraphInputMessageInput = {
                protocol: 'graph',
                command: 'renamenode',
                payload: {
                  graph: 'foo',
                  from: 'somenode',
                  to: 'someothernode',
                },
              }
              const output: RenameNodeGraphOutputMessage = {
                protocol: 'graph',
                command: 'renamenode',
                payload: {
                  graph: 'foo',
                  from: 'somenode',
                  to: 'someothernode',
                },
              }
              await assertOutputMatchesExpected(input, [output])
            })
          })
        })
      })

      describe('RenameOutportGraph', () => {
        // TODO: This event does not contain a NodeID, so I cannot check if the
        // node exists. Create a Ticket in the NoFo ecosystem to check.
        // describe('When passed RemoveOutportGraph and a node does not exist on the graph', () => {
        //   it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
        //     const input: RemoveOutportGraphInputMessageInput = {
        //       protocol: 'graph',
        //       command: 'removeoutport',
        //       payload: {
        //         graph: 'foo',
        //         public: 'someport',
        //       },
        //     }
        //     const output: ErrorGraphOutputMessage = {
        //       protocol: 'graph',
        //       command: 'error',
        //       payload: {
        //         message: 'NodeNotFound',
        //       },
        //     }
        //     await assertOutputMatchesExpected(input, [output])
        //   })
        // })

        // describe('When passed RemoveOutportGraph and the node exists on the graph', () => {
        beforeEach(async () => {
          const input: AddNodeGraphInputMessageInput = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          const output: AddNodeGraphOutputMessage = {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: 'foo',
              id: 'somenode',
              component: 'somecomponent',
              metadata: {},
            },
          }
          await assertOutputMatchesExpected(input, [output])
        })

        describe('When passed RenameOutportGraph and the Outport does not exist on the node', () => {
          it('should return a OutportNotFound ErrorGraphOutputMessage', async () => {
            const input: RenameOutportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'renameoutport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: ErrorGraphOutputMessage = {
              protocol: 'graph',
              command: 'error',
              payload: {
                message: 'OutportNotFound',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })

        describe('When passed RenameOutportGraph and the Outport exists on the node', () => {
          beforeEach(async () => {
            const input: AddOutportGraphInputMessageInput = {
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
            const output: AddOutportGraphOutputMessage = {
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
            await assertOutputMatchesExpected(input, [output])
          })

          it('should return a RenameOutportGraphOutputMessage', async () => {
            const input: RenameOutportGraphInputMessageInput = {
              protocol: 'graph',
              command: 'renameoutport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            const output: RenameOutportGraphOutputMessage = {
              protocol: 'graph',
              command: 'renameoutport',
              payload: {
                graph: 'foo',
                from: 'someport',
                to: 'someotherport',
              },
            }
            await assertOutputMatchesExpected(input, [output])
          })
        })
        // })
      })
    })
  })
})
