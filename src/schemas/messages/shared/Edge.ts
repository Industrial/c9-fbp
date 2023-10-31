import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { MetadataEdge, MetadataEdgeInput, MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { Port, PortInput, PortSchema } from '#/schemas/messages/shared/Port.ts'

export type EdgeInput = {
  src: PortInput
  tgt: PortInput
  metadata: MetadataEdgeInput
}

export type Edge = {
  src: Port
  tgt: Port
  metadata: MetadataEdge
}

export const EdgeSchema = S.Struct({
  src: PortSchema,
  tgt: PortSchema,
  metadata: MetadataEdgeSchema,
})

export const EdgeTranscoder = deriveTranscoder<EdgeInput, Edge>(EdgeSchema)
