import * as Eq from 'fp-ts/Eq.ts'
// import * as IIPSchema from '#/schemas/messages/shared/IIP.ts'
// import { Node } from './node.ts'
// import { Port } from './port.ts'

export type IIP = {
  data: unknown
  metadata: Record<string, unknown>
}

export const create = (
  data: IIP['data'],
  metadata: IIP['metadata'],
): IIP => ({
  data,
  metadata,
})

// export const serialize = (iip: IIP, node: Node, port: Port): IIPSchema.IIP =>
//   IIPSchema.IIPTranscoder.decode({
//     src: {
//       data: iip.data as unknown as IIPSchema.IIP['src']['data'],
//     },
//     tgt: {
//       node: node.id,
//       port: port.id,
//     },
//     metadata: iip.metadata,
//   })

// export const deserialize = (iip: IIPSchema.IIP): IIP =>
//   create(
//     iip.src.data,
//     iip.metadata,
//   )

export const eq: Eq.Eq<IIP> = Eq.fromEquals((a, b) => a.data === b.data)
