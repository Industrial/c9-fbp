import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts'
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
    // StartedNetworkOutputMessage
    // StoppedNetworkOutputMessage

    // TODO: I don't know what message to return.
    // describe('DebugNetworkInputMessage', () => {
    // })

    describe('EdgesNetworkInputMessage', () => {
      describe('When one of the edges does not exist on the graph', () => {
        it('should return a EdgeNotFound ErrorNetworkOutputMessage', async () => {
        })
      })

      describe('When all the edges exist on the graph', () => {
        beforeEach(async () => {
        })

        it('should return a EdgesNetworkOutputMessage', async () => {
        })
      })
    })

    describe('GetStatusNetworkInputMessage', () => {
      it('should return a StatusNetworkOutputMessage', () => {
      })
    })

    describe('PersistNetworkInputMessage', () => {
      it('should return a PersistNetworkOutputMessage', () => {
      })
    })

    describe('StartNetworkInputMessage', () => {
      it('should return a StartedNetworkOutputMessage', () => {
      })
    })

    describe('StopNetworkInputMessage', () => {
      it('should return a StoppedNetworkOutputMessage', () => {
      })
    })
  })
})
