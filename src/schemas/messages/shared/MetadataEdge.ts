import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const MetadataEdgeSchema = S.Struct({
  route: S.Int(),
  schema: S.Optional(S.String()),
  secure: S.Optional(S.Boolean),
})

export type MetadataEdgeInput = S.InputOf<typeof MetadataEdgeSchema>

export type MetadataEdge = S.OutputOf<typeof MetadataEdgeSchema>

export const MetadataEdgeTranscoder = deriveTranscoder(MetadataEdgeSchema)
