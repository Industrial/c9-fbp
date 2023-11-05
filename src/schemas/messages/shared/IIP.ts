import * as S from 'schemata-ts'
import { IIPValueSchema } from '#/schemas/messages/shared/IIPValue.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const IIPSchema = S.Struct({
  src: IIPValueSchema,
  tgt: S.Struct({
    node: NodeIDSchema,
    port: PortIDSchema,
  }),
  metadata: MetadataEdgeSchema,
})

export type IIPInput = S.InputOf<typeof IIPSchema>

export type IIP = S.OutputOf<typeof IIPSchema>

export const IIPTranscoder = deriveTranscoder(IIPSchema)
