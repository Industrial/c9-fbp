import { GraphGuard } from '#/schemas/messages/shared/Graph.ts'
import { assertEquals } from 'std/assert/mod.ts'
import { describe, it } from 'std/testing/bdd.ts'
import { main } from '#/graphs.ts'

describe('graphs', () => {
  describe('main', () => {
    it('should return the expected object', async () => {
      const actual = main()

      assertEquals(true, GraphGuard.is(actual))
    })
  })
})
