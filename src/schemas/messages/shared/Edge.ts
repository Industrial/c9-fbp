import * as S from 'schemata-ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const EdgeSchema = S.Struct({
  src: TargetNodeSchema,
  tgt: TargetNodeSchema,
  metadata: MetadataEdgeSchema,
})

export type EdgeInput = S.InputOf<typeof EdgeSchema>

export type Edge = S.OutputOf<typeof EdgeSchema>

export const EdgeTranscoder = deriveTranscoder<EdgeInput, Edge>(EdgeSchema)
