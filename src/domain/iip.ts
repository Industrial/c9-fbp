import * as Eq from 'fp-ts/Eq.ts'
import * as IIPSchema from '#/schemas/messages/shared/IIP.ts'
import { Node } from './node.ts'
import { Port } from './port.ts'

export type IIP = {
  data: unknown
  metadata: Record<string, unknown>
}

export const create = (
  data: IIP['data'],
  metadata: IIP['metadata'],
): IIP => {
  return {
    data,
    metadata,
  }
}

export const serialize = (iip: IIP, node: Node, port: Port): IIPSchema.IIP => {
  const input: IIPSchema.IIPInput = {
    src: {
      data: iip.data as unknown as IIPSchema.IIP['src']['data'],
    },
    tgt: {
      node: node.id,
      port: port.id,
    },
    metadata: iip.metadata,
  }

  return IIPSchema.IIPTranscoder.decode(input)
}

export const deserialize = (iip: IIPSchema.IIP): IIP => {
  return create(
    iip.src.data,
    iip.metadata,
  )
}

export const eq: Eq.Eq<IIP> = Eq.fromEquals((a, b) => {
  return a.data === b.data
})
