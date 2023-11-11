import { afterEach, beforeEach, describe } from 'std/testing/bdd.ts'
import { createClient, createServer, destroyServer, whenClientHasClosed, whenClientHasOpened } from '#/test/server.ts'

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

  describe('Component Protocol', () => {
    // describe('When no ClearGraph has been passed', () => {
    //   it('should return a GraphNotFound ErrorGraphOutputMessage', async () => {
    //     const input: AddNodeGraphInputMessageInput = {
    //       protocol: 'graph',
    //       command: 'addnode',
    //       payload: {
    //         component: 'foo',
    //         graph: 'foo',
    //         id: 'foo',
    //         metadata: {},
    //       },
    //     }
    //     const output: ErrorGraphOutputMessage = {
    //       protocol: 'graph',
    //       command: 'error',
    //       payload: {
    //         message: 'GraphNotFound',
    //       },
    //     }
    //     await assertOutputMatchesExpected(input, [output])
    //   })
    // })

    // describe('When ClearGraph has been passed', () => {
    //   beforeEach(async () => {
    //     const input: ClearGraphInputMessageInput = {
    //       protocol: 'graph',
    //       command: 'clear',
    //       payload: {
    //         id: 'foo',
    //         name: 'foo',
    //         main: true,
    //       },
    //     }
    //     // Don't use the ClearGraphOutputMessage type here because it includes
    //     // undefined values which are not serialized/parsed by JSON.
    //     const output = {
    //       protocol: 'graph',
    //       command: 'clear',
    //       payload: {
    //         id: 'foo',
    //         name: 'foo',
    //         main: true,
    //         // library: undefined,
    //         // icon: undefined,
    //         // description: undefined,
    //       },
    //     }
    //     await assertOutputMatchesExpected(input, [output])
    //   })

    //   describe('AddEdgeGraph', () => {
    //     describe('When passed AddEdgeGraph and a node on the edge does not exist on the graph', () => {
    //       it('should return a NodeNotFound ErrorGraphOutputMessage', async () => {
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
    //         const output: ErrorGraphOutputMessage = {
    //           protocol: 'graph',
    //           command: 'error',
    //           payload: {
    //             message: 'NodeNotFound',
    //           },
    //         }
    //         await assertOutputMatchesExpected(input, [output])
    //       })
    //     })

    //     describe('When passed AddEdgeGraph and all nodes on the edge exist on the graph', () => {
    //       beforeEach(async () => {
    //         const firstInput: AddNodeGraphInputMessageInput = {
    //           protocol: 'graph',
    //           command: 'addnode',
    //           payload: {
    //             graph: 'foo',
    //             id: 'somenode',
    //             component: 'somecomponent',
    //             metadata: {},
    //           },
    //         }
    //         const firstOutput: AddNodeGraphOutputMessage = {
    //           protocol: 'graph',
    //           command: 'addnode',
    //           payload: {
    //             graph: 'foo',
    //             id: 'somenode',
    //             component: 'somecomponent',
    //             metadata: {},
    //           },
    //         }
    //         await assertOutputMatchesExpected(firstInput, [firstOutput])
    //         const secondInput: AddNodeGraphInputMessageInput = {
    //           protocol: 'graph',
    //           command: 'addnode',
    //           payload: {
    //             graph: 'foo',
    //             id: 'someothernode',
    //             component: 'someothercomponent',
    //             metadata: {},
    //           },
    //         }
    //         const secondOutput: AddNodeGraphOutputMessage = {
    //           protocol: 'graph',
    //           command: 'addnode',
    //           payload: {
    //             graph: 'foo',
    //             id: 'someothernode',
    //             component: 'someothercomponent',
    //             metadata: {},
    //           },
    //         }
    //         await assertOutputMatchesExpected(secondInput, [secondOutput])
    //       })

    //       describe('When a port on the edge does not exist on a node', () => {
    //         it('should return a OutportNotFound ErrorGraphOutputMessage', async () => {
    //           const input: AddEdgeGraphInputMessageInput = {
    //             protocol: 'graph',
    //             command: 'addedge',
    //             payload: {
    //               graph: 'foo',
    //               src: {
    //                 node: 'somenode',
    //                 port: 'someport',
    //               },
    //               tgt: {
    //                 node: 'someothernode',
    //                 port: 'someotherport',
    //               },
    //               metadata: {},
    //             },
    //           }
    //           const output: ErrorGraphOutputMessage = {
    //             protocol: 'graph',
    //             command: 'error',
    //             payload: {
    //               message: 'OutportNotFound',
    //             },
    //           }
    //           await assertOutputMatchesExpected(input, [output])
    //         })
    //       })

    //       describe('When all ports on the edge exist on the nodes', () => {
    //         beforeEach(async () => {
    //           const firstInput: AddOutportGraphInputMessageInput = {
    //             protocol: 'graph',
    //             command: 'addoutport',
    //             payload: {
    //               graph: 'foo',
    //               node: 'somenode',
    //               port: 'someport',
    //               public: 'someport',
    //               metadata: {},
    //             },
    //           }
    //           const firstOutput: AddOutportGraphOutputMessage = {
    //             protocol: 'graph',
    //             command: 'addoutport',
    //             payload: {
    //               graph: 'foo',
    //               node: 'somenode',
    //               port: 'someport',
    //               public: 'someport',
    //               metadata: {},
    //             },
    //           }
    //           await assertOutputMatchesExpected(firstInput, [firstOutput])
    //           const secondInput: AddInportGraphInputMessageInput = {
    //             protocol: 'graph',
    //             command: 'addinport',
    //             payload: {
    //               graph: 'foo',
    //               node: 'someothernode',
    //               port: 'someotherport',
    //               public: 'someotherport',
    //               metadata: {},
    //             },
    //           }
    //           const secondOutput: AddInportGraphOutputMessage = {
    //             protocol: 'graph',
    //             command: 'addinport',
    //             payload: {
    //               graph: 'foo',
    //               node: 'someothernode',
    //               port: 'someotherport',
    //               public: 'someotherport',
    //               metadata: {},
    //             },
    //           }
    //           await assertOutputMatchesExpected(secondInput, [secondOutput])
    //         })

    //         it('should return a AddEdgeGraphOutputMessage', async () => {
    //           const input: AddEdgeGraphInputMessageInput = {
    //             protocol: 'graph',
    //             command: 'addedge',
    //             payload: {
    //               graph: 'foo',
    //               src: {
    //                 node: 'somenode',
    //                 port: 'someport',
    //               },
    //               tgt: {
    //                 node: 'someothernode',
    //                 port: 'someotherport',
    //               },
    //               metadata: {},
    //             },
    //           }
    //           const output: AddEdgeGraphOutputMessage = {
    //             protocol: 'graph',
    //             command: 'addedge',
    //             payload: {
    //               graph: 'foo',
    //               src: {
    //                 node: 'somenode',
    //                 port: 'someport',
    //               },
    //               tgt: {
    //                 node: 'someothernode',
    //                 port: 'someotherport',
    //               },
    //               metadata: {
    //                 route: undefined,
    //                 schema: undefined,
    //                 secure: undefined,
    //               },
    //             },
    //           }
    //           await assertOutputMatchesExpected(input, [output])
    //         })
    //       })
    //     })
    //   })
    // })
  })
})
