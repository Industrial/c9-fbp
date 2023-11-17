import * as IIPDomain from '#/domain1/iip.ts'
import * as IIPSchema from '#/schemas/messages/shared/IIP.ts'
import * as PortSchema from '#/schemas/messages/shared/Port.ts'
import { IIP } from '#/domain1/iip.ts'
import { Node, NodeID } from '#/domain1/node.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'

export type PortID = string

export type PortTarget = {
  nodeId: NodeID
  portId: PortID
}

export type Port = {
  id: PortID
  public: PortID
  metadata: Record<string, unknown>
  iip?: IIP
  stream: TransformStream
}

const portTransformer: Transformer<Value, Value> = {
  transform: async (chunk, controller) => {
    controller.enqueue(chunk)
  },
}

export const createPort = (
  id: Port['id'],
  publicName: Port['public'],
  metadata: Port['metadata'],
  iip?: Port['iip'],
): Port => {
  return {
    id,
    'public': publicName,
    metadata,
    iip,
    stream: new TransformStream(portTransformer),
  }
}

export const serialize = (port: Port, node: Node, index: number): PortSchema.Port => {
  const input: PortSchema.PortInput = {
    node: node.id,
    index: index as PortSchema.PortInput['index'],
    port: port.id,
    public: port.public,
    metadata: port.metadata,
  }

  return PortSchema.PortTranscoder.decode(input)
}

export const deserialize = (
  port: PortSchema.Port,
  iip?: IIPSchema.IIP,
): Port => {
  return iip
    ? createPort(
      port.port,
      port.public,
      port.metadata ?? {},
      IIPDomain.deserialize(iip),
    )
    : createPort(
      port.port,
      port.public,
      port.metadata ?? {},
    )
}

// const portTransformStream = new TransformStream(portTransformer)

// // https://streams.spec.whatwg.org/#rs-class
// const portReadableStream = new ReadableStream({
//   start: (controller) => {
//     const push = () => {
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
//   write: async (chunk, controller) => {
//   },
// })
