import * as S from 'schemata-ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const EdgeSchema = S.Struct({
  src: S.Struct({
    node: NodeIDSchema,
    port: PortIDSchema,
  }),
  tgt: S.Struct({
    node: NodeIDSchema,
    port: PortIDSchema,
  }),
  metadata: MetadataEdgeSchema,
})

export type EdgeInput = S.InputOf<typeof EdgeSchema>

export type Edge = S.OutputOf<typeof EdgeSchema>

export const EdgeTranscoder = deriveTranscoder<EdgeInput, Edge>(EdgeSchema)
