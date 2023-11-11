import chai from 'chai'
import { startServer } from '#/server.ts'

chai.config.truncateThreshold = 0

const config = JSON.parse(await Deno.readTextFile('./fbp-config.json'))
const hostname = config.host as string
const port = config.port as number

let serverInstance: Deno.Server | undefined
let socketInstance: WebSocket

export const createServer = async () => {
  serverInstance = startServer(hostname, port)
}

export const destroyServer = async () => {
  await serverInstance?.shutdown()
  serverInstance = undefined
}

export const createClient = async () => {
  socketInstance = new WebSocket(`ws://${hostname}:${port}`)
}

export const whenClientHasOpened = async () => {
  return await new Promise<void>((resolve) => {
    socketInstance.onopen = () => {
      resolve()
      socketInstance.onopen = null
    }
  })
}

export const whenClientHasClosed = async () => {
  return await new Promise<void>((resolve) => {
    socketInstance.onclose = () => {
      resolve()
      socketInstance.onclose = null
    }
    socketInstance.close()
  })
}

export const whenMessageIsReceived = async (): Promise<MessageEvent<unknown>> => {
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

export const assertOutputMatchesExpected = async (
  actual: Record<string, unknown>,
  expected: Array<Record<string, unknown>>,
) => {
  if (expected.length === 0) {
    return
  }

  const resultPromise = whenMessageIsReceived()
  socketInstance.send(JSON.stringify(actual))

  const result = await resultPromise
  const resultJSON = JSON.parse(result.data as string)
  const currentExpectation = expected.slice(0, 1)[0]

  const removeUndefineds = (x: unknown) => {
    return JSON.parse(JSON.stringify(x))
  }

  chai.expect(removeUndefineds(resultJSON)).to.deep.equal(removeUndefineds(currentExpectation))

  await assertOutputMatchesExpected(actual, expected.slice(1))
}
