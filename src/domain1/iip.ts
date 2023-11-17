import * as IIPSchema from '#/schemas/messages/shared/IIP.ts'
import { Node } from '#/domain1/node.ts'
import { Port } from '#/domain1/port.ts'

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
