// import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts'
// import { createClient, createServer, destroyServer, whenClientHasClosed, whenClientHasOpened } from '#/test/server.ts'

// describe('Runtime', () => {
//   beforeEach(async () => {
//     await createServer()
//     await createClient()
//     await whenClientHasOpened()
//   })

//   afterEach(async () => {
//     await whenClientHasClosed()
//     await destroyServer()
//   })

//   describe('Component Protocol', () => {
//     describe('GetSourceComponentInputMessage', () => {
//       describe('When the component does not exist', () => {
//         it('should return a ComponentNotFound ErrorComponentOutputMessage', async () => {
//         })
//       })

//       describe('When the component exists', () => {
//         beforeEach(async () => {
//         })

//         it('should return a SourceComponentOutputMessage', async () => {
//         })
//       })
//     })

//     describe('ListComponentInputMessage', () => {
//       describe('When there are no components', () => {
//         it('should return a ComponentsReadyComponentOutputMessage', async () => {
//         })
//       })

//       describe('When there are components', () => {
//         beforeEach(async () => {
//         })

//         it('should return several ComponentComponentOutputMessage\'s followed by a ComponentsReadyComponentOutputMessage', async () => {
//         })
//       })
//     })

//     describe('SourceComponentInputMessage', () => {
//       describe('When the component does not exist', () => {
//         it('should return a ComponentExists ErrorComponentOutputMessage', async () => {
//         })
//       })

//       describe('When the component already exists', () => {
//         beforeEach(async () => {
//         })

//         it('should return a SourceComponentOutputMessage', async () => {
//         })
//       })
//     })
//   })
// })
