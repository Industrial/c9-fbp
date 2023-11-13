import { AddNodeGraphInputMessageInput } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { ClearGraphInputMessageInput } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ErrorGraphOutputMessage } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { ErrorNetworkOutputMessage } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { GetStatusNetworkInputMessageInput } from '#/schemas/messages/network/input/GetStatusNetworkInputMessage.ts'
import { StartNetworkInputMessageInput } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import {
  StartedNetworkOutputMessage,
  StartedNetworkOutputMessageGuard,
} from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'
import { StatusNetworkOutputMessageGuard } from '#/schemas/messages/network/output/StatusNetworkOutputMessage.ts'
import { StopNetworkInputMessageInput } from '#/schemas/messages/network/input/StopNetworkInputMessage.ts'
import { StoppedNetworkOutputMessageGuard } from '#/schemas/messages/network/output/StoppedNetworkOutputMessage.ts'
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts'
import {
  assertOutputMatchesPredicates,
  assertOutputMatchesValues,
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

  describe('Network Protocol', () => {
    // TODO: Not tested:
    // BeginGroupNetworkOutputMessage
    // ConnectNetworkOutputMessage
    // DataNetworkOutputMessage
    // DisconnectNetworkOutputMessage
    // EndGroupNetworkOutputMessage
    // IconNetworkOutputMessage
    // OutputNetworkOutputMessage
    // ProcessErrorNetworkOutputMessage

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
        await assertOutputMatchesValues(input, [output])
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
        await assertOutputMatchesValues(input, [output])
      })

      // TODO: I don't know what message to return.
      // describe('DebugNetworkInputMessage', () => {
      // })

      // TODO: Implement when debugging is required.
      // describe('EdgesNetworkInputMessage', () => {
      //   describe('When one of the edges does not exist on the graph', () => {
      //     it('should return a EdgeNotFound ErrorNetworkOutputMessage', async () => {
      //       const input: EdgesNetworkInputMessageInput = {
      //         protocol: 'network',
      //         command: 'edges',
      //         payload: {
      //           graph: 'foo',
      //           enable: true,
      //           edges: [
      //             {
      //               src: {
      //                 node: 'somenode',
      //                 port: 'someport',
      //               },
      //               tgt: {
      //                 node: 'someothernode',
      //                 port: 'someotherport',
      //               },
      //             },
      //           ],
      //         },
      //       }
      //       const output: ErrorNetworkOutputMessage = {
      //         protocol: 'network',
      //         command: 'error',
      //         payload: {
      //           graph: 'foo',
      //           message: 'EdgeNotFound',
      //           stack: undefined,
      //         },
      //       }
      //       await assertOutputMatchesExpected(input, [output])
      //     })
      //   })

      //   describe('When all the edges exist on the graph', () => {
      //     beforeEach(async () => {
      //       await (async () => {
      //         const input: AddNodeGraphInputMessageInput = {
      //           protocol: 'graph',
      //           command: 'addnode',
      //           payload: {
      //             graph: 'foo',
      //             id: 'somenode',
      //             component: 'somecomponent',
      //             metadata: {},
      //           },
      //         }
      //         const output: AddNodeGraphOutputMessage = {
      //           protocol: 'graph',
      //           command: 'addnode',
      //           payload: {
      //             graph: 'foo',
      //             id: 'somenode',
      //             component: 'somecomponent',
      //             metadata: {},
      //           },
      //         }
      //         await assertOutputMatchesExpected(input, [output])
      //       })()

      //       await (async () => {
      //         const input: AddNodeGraphInputMessageInput = {
      //           protocol: 'graph',
      //           command: 'addnode',
      //           payload: {
      //             graph: 'foo',
      //             id: 'someothernode',
      //             component: 'someothercomponent',
      //             metadata: {},
      //           },
      //         }
      //         const output: AddNodeGraphOutputMessage = {
      //           protocol: 'graph',
      //           command: 'addnode',
      //           payload: {
      //             graph: 'foo',
      //             id: 'someothernode',
      //             component: 'someothercomponent',
      //             metadata: {},
      //           },
      //         }
      //         await assertOutputMatchesExpected(input, [output])
      //       })()

      //       await (async () => {
      //         const input: AddOutportGraphInputMessageInput = {
      //           protocol: 'graph',
      //           command: 'addoutport',
      //           payload: {
      //             graph: 'foo',
      //             node: 'somenode',
      //             port: 'someport',
      //             public: 'someport',
      //             metadata: {},
      //           },
      //         }
      //         const output: AddOutportGraphOutputMessage = {
      //           protocol: 'graph',
      //           command: 'addoutport',
      //           payload: {
      //             graph: 'foo',
      //             node: 'somenode',
      //             port: 'someport',
      //             public: 'someport',
      //             metadata: {},
      //           },
      //         }
      //         await assertOutputMatchesExpected(input, [output])
      //       })()

      //       await (async () => {
      //         const input: AddInportGraphInputMessageInput = {
      //           protocol: 'graph',
      //           command: 'addinport',
      //           payload: {
      //             graph: 'foo',
      //             node: 'someothernode',
      //             port: 'someotherport',
      //             public: 'someotherport',
      //             metadata: {},
      //           },
      //         }
      //         const output: AddInportGraphOutputMessage = {
      //           protocol: 'graph',
      //           command: 'addinport',
      //           payload: {
      //             graph: 'foo',
      //             node: 'someothernode',
      //             port: 'someotherport',
      //             public: 'someotherport',
      //             metadata: {},
      //           },
      //         }
      //         await assertOutputMatchesExpected(input, [output])
      //       })()

      //       await (async () => {
      //         const input: AddEdgeGraphInputMessageInput = {
      //           protocol: 'graph',
      //           command: 'addedge',
      //           payload: {
      //             graph: 'foo',
      //             src: {
      //               node: 'somenode',
      //               port: 'someport',
      //             },
      //             tgt: {
      //               node: 'someothernode',
      //               port: 'someotherport',
      //             },
      //             metadata: {},
      //           },
      //         }
      //         const output: AddEdgeGraphOutputMessage = {
      //           protocol: 'graph',
      //           command: 'addedge',
      //           payload: {
      //             graph: 'foo',
      //             src: {
      //               node: 'somenode',
      //               port: 'someport',
      //             },
      //             tgt: {
      //               node: 'someothernode',
      //               port: 'someotherport',
      //             },
      //             metadata: {
      //               route: undefined,
      //               schema: undefined,
      //               secure: undefined,
      //             },
      //           },
      //         }
      //         await assertOutputMatchesExpected(input, [output])
      //       })()
      //     })

      //     it('should return a EdgesNetworkOutputMessage', async () => {
      //       const input: EdgesNetworkInputMessageInput = {
      //         protocol: 'network',
      //         command: 'edges',
      //         payload: {
      //           graph: 'foo',
      //           enable: true,
      //           edges: [
      //             {
      //               src: {
      //                 node: 'somenode',
      //                 port: 'someport',
      //               },
      //               tgt: {
      //                 node: 'someothernode',
      //                 port: 'someotherport',
      //               },
      //             },
      //           ],
      //         },
      //       }
      //       const output: EdgesNetworkOutputMessage = {
      //         protocol: 'network',
      //         command: 'edges',
      //         payload: {
      //           graph: 'foo',
      //           enable: true,
      //           edges: [
      //             {
      //               src: {
      //                 node: 'somenode',
      //                 port: 'someport',
      //               },
      //               tgt: {
      //                 node: 'someothernode',
      //                 port: 'someotherport',
      //               },
      //             },
      //           ],
      //         },
      //       }
      //       await assertOutputMatchesExpected(input, [output])
      //     })
      //   })
      // })

      describe('GetStatusNetworkInputMessage', () => {
        it('should return a StatusNetworkOutputMessage', async () => {
          const input: GetStatusNetworkInputMessageInput = {
            protocol: 'network',
            command: 'getstatus',
            payload: {
              graph: 'foo',
            },
          }
          await assertOutputMatchesPredicates(input, [StatusNetworkOutputMessageGuard.is])
        })
      })

      // TODO: Find out what kind of message to return.
      // TODO: Implement when debugging is required.
      // describe('PersistNetworkInputMessage', () => {
      //   it('should return a PersistNetworkOutputMessage', async () => {
      //     const input: PersistNetworkInputMessageInput = {
      //       protocol: 'network',
      //       command: 'persist',
      //       payload: {},
      //     }
      //     const output: PersistNetworkOutputMessage = {
      //       protocol: 'network',
      //       command: 'edges',
      //       payload: {
      //         graph: 'foo',
      //         enable: true,
      //         edges: [
      //           {
      //             src: {
      //               node: 'somenode',
      //               port: 'someport',
      //             },
      //             tgt: {
      //               node: 'someothernode',
      //               port: 'someotherport',
      //             },
      //           },
      //         ],
      //       },
      //     }
      //     await assertOutputMatchesExpected(input, [output])
      //   })
      // })

      describe('StartNetworkInputMessage', () => {
        it('should return a StartedNetworkOutputMessage', async () => {
          const input: StartNetworkInputMessageInput = {
            protocol: 'network',
            command: 'start',
            payload: {
              graph: 'foo',
            },
          }
          await assertOutputMatchesPredicates(input, [StartedNetworkOutputMessageGuard.is])
        })
      })

      describe('StopNetworkInputMessage', () => {
        describe('When no StartNetworkInputMessage has been passed', () => {
          it('should return a NotStarted ErrorNetworkOutputMessage', async () => {
            const input: StopNetworkInputMessageInput = {
              protocol: 'network',
              command: 'stop',
              payload: {
                graph: 'foo',
              },
            }
            const output: ErrorNetworkOutputMessage = {
              protocol: 'network',
              command: 'error',
              payload: {
                graph: 'foo',
                message: 'NotStarted',
                stack: undefined,
              },
            }
            await assertOutputMatchesValues(input, [output])
          })
        })

        describe('When a StartNetworkInputMessage has been passed', () => {
          beforeEach(async () => {
            const input: StartNetworkInputMessageInput = {
              protocol: 'network',
              command: 'start',
              payload: {
                graph: 'foo',
              },
            }
            await assertOutputMatchesPredicates(input, [StartedNetworkOutputMessageGuard.is])
          })

          it('should return a StoppedNetworkOutputMessage', async () => {
            const input: StopNetworkInputMessageInput = {
              protocol: 'network',
              command: 'stop',
              payload: {
                graph: 'foo',
              },
            }
            await assertOutputMatchesPredicates(input, [StoppedNetworkOutputMessageGuard.is])
          })
        })
      })
    })
  })
})
