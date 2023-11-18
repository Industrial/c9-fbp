import * as E from 'fp-ts/Either.ts'
import * as Eq from 'fp-ts/Eq.ts'
import * as IIPDomain from '#/domain/iip.ts'
import * as IIPSchema from '#/schemas/messages/shared/IIP.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortSchema from '#/schemas/messages/shared/Port.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'
import { pipe } from 'fp-ts/function.ts'

export type PortID = string

export type Port = {
  id: PortID
  public: PortID
  metadata: Record<string, unknown>
  iip?: IIPDomain.IIP
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
  iip,
  stream: new TransformStream(portTransformer),
})

export const serialize = (port: Port, node: NodeDomain.Node, index: number): PortSchema.Port =>
  PortSchema.PortTranscoder.decode({
    node: node.id,
    index: index as PortSchema.PortInput['index'],
    port: port.id,
    public: port.public,
    metadata: port.metadata,
  })

export const deserialize = (
  port: PortSchema.Port,
  iip?: IIPSchema.IIP,
): Port =>
  iip
    ? create(
      port.port,
      port.public,
      port.metadata ?? {},
      IIPDomain.deserialize(iip),
    )
    : create(
      port.port,
      port.public,
      port.metadata ?? {},
    )

export const eq: Eq.Eq<Port> = Eq.fromEquals((a, b) => a.id === b.id)

export const containsIIP = (iip: IIPDomain.IIP) => (port: Port): E.Either<Error, Port> =>
  pipe(
    port.iip,
    E.fromPredicate(
      (entry) => Boolean(entry) && IIPDomain.eq.equals(entry as IIPDomain.IIP, iip),
      () => new Error('IIPNotFound'),
    ),
    E.map(() => port),
  )

export const withIIP = (iip: IIPDomain.IIP) => (port: Port): E.Either<Error, Port> =>
  E.right(create(port.id, port.public, port.metadata, iip))

export const withoutIIP = () => (port: Port): E.Either<Error, Port> =>
  E.right(create(port.id, port.public, port.metadata))

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
