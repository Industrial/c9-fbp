import { areGraphsEqual, areGraphsNotEqual } from '#/domain/graph.ts'
import { assertEquals } from 'std/assert/mod.ts'
import { describe, it } from 'std/testing/bdd.ts'

describe('domain/graph', () => {
  describe('areGraphsEqual', () => {
    describe('When passed two graphs that have different id\'s', () => {
      it('should return false', () => {
        const expected = false
        const actual = areGraphsEqual({
          id: 'a',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })({
          id: 'b',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })

        assertEquals(actual, expected)
      })
    })

    describe('When passed two graphs that have equal id\'s', () => {
      it('should return true', () => {
        const expected = true
        const actual = areGraphsEqual({
          id: 'a',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })({
          id: 'a',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })

        assertEquals(actual, expected)
      })
    })
  })

  describe('areGraphsNotEqual', () => {
    describe('When passed two graphs that have different id\'s', () => {
      it('should return true', () => {
        const expected = true
        const actual = areGraphsNotEqual({
          id: 'a',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })({
          id: 'b',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })

        assertEquals(actual, expected)
      })
    })

    describe('When passed two graphs that have equal id\'s', () => {
      it('should return false', () => {
        const expected = false
        const actual = areGraphsNotEqual({
          id: 'a',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })({
          id: 'a',
          description: '',
          edges: [],
          groups: [],
          icon: '',
          iips: [],
          inports: [],
          library: '',
          main: true,
          name: '',
          network: {
            hasStarted: false,
            isDebugging: false,
            isRunning: false,
            //@ts-expect-error error
            startTime: '',
          },
        })

        assertEquals(actual, expected)
      })
    })
  })
})
