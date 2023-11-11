import { assertObjectMatch } from 'std/assert/mod.ts'
import { describe, it } from 'std/testing/bdd.ts'
import { main } from '#/graphs.ts'

describe('graphs', () => {
  describe('main', () => {
    it('should return the expected object', async () => {
      const expected = {
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
      }
      const actual = main()

      assertObjectMatch(actual, expected)
    })
  })
})
