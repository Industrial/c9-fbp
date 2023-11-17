import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const MetadataEdgeSchema = S.Struct({
  route: S.Optional(S.Float()),
  schema: S.Optional(S.String()),
  secure: S.Optional(S.Boolean),
})

export type MetadataEdgeInput = S.InputOf<typeof MetadataEdgeSchema>

export type MetadataEdge = S.OutputOf<typeof MetadataEdgeSchema>

export const MetadataEdgeTranscoder = deriveTranscoder(MetadataEdgeSchema)

export const MetadataEdgeInputGuard = deriveInputGuard(MetadataEdgeSchema)

export const MetadataEdgeGuard = deriveGuard(MetadataEdgeSchema)
