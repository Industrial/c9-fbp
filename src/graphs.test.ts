import { assertObjectMatch } from 'std/assert/mod.ts'
import { describe, it } from 'std/testing/bdd.ts'
import { main } from '#/graphs.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'

describe('graphs', () => {
  describe('main', () => {
    it('should return the expected object', async () => {
      const expected: Graph = {
        id: 'main',
        main: true,
        name: 'main',
        outports: [],
        nodes: [],
        inports: [],
        iips: [],
        groups: [],
        edges: [],
        library: undefined,
        description: undefined,
        icon: undefined,
        network: {
          isDebugging: false,
          isRunning: true,
          hasStarted: true,
          // TODO: Solve this type error with schemata-ts across the board.
          // @ts-expect-error error
          startTime: new Date().toISOString(),
        },
      }
      const actual = main()

      assertObjectMatch(actual, expected)
    })
  })
})
