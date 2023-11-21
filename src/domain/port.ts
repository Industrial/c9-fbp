import * as E from 'fp-ts/Either.ts'
import * as Eq from 'fp-ts/Eq.ts'
import * as IIPDomain from '#/domain/iip.ts'
import * as O from 'fp-ts/Option.ts'
import * as equals from '#/equals.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'
import { lens as L, traversal as T } from 'monocle-ts'
import { pipe } from 'fp-ts/function.ts'

export type Port = {
  id: string
  public: string
  metadata: Record<string, unknown>
  iip: O.Option<IIPDomain.IIP>
  stream: TransformStream
}

const portTransformer: Transformer<Value, Value> = {
  transform: async (chunk, controller) => controller.enqueue(chunk),
}

export const create = (
  id: Port['id'],
  publicName: Port['public'],
  metadata: Port['metadata'],
  iip?: Port['iip'],
): Port => ({
  id,
  'public': publicName,
  metadata,
  iip: iip ? iip : O.none,
  stream: new TransformStream(portTransformer),
})

export const eq: Eq.Eq<Port> = Eq.fromEquals(equals.byProperty('id'))

export const hasIIP = (iip: IIPDomain.IIP) => (port: Port) =>
  pipe(
    port,
    pipe(
      L.id<Port>(),
      L.prop('iip'),
    ).get,
    (portIIP) => O.isSome(portIIP) && IIPDomain.eq.equals(iip, portIIP.value),
  )

export const iipNotFoundError = () => new Error('IIPNotFound')

export const hasIIPE = (iip: IIPDomain.IIP) => (port: Port) =>
  pipe(
    port,
    E.fromPredicate(
      hasIIP(iip),
      iipNotFoundError,
    ),
  )

export const modifyIIP = (f: (iip: O.Option<IIPDomain.IIP>) => O.Option<IIPDomain.IIP>) =>
  pipe(
    T.id<Port>(),
    T.prop('iip'),
    T.modify(f),
  )

// const portTransformStream = new TransformStream(portTransformer)

// // https://streams.spec.whatwg.org/#rs-class
// const portReadableStream = new ReadableStream({
//   start: (controller) =>
//     const push = () =>
//       // const { done, value } = await someDataSource.read()
//       const done = false
//       const value = 123
//       if (done) {
//         controller.close()
//         return
//       }
//       controller.enqueue(value)
//       push()
//     }
//     push()
//   },
// })

// // https://streams.spec.whatwg.org/#ws-class
// const portWritableStream = new WritableStream({
//   write: async (chunk, controller) =>
//   },
// })
