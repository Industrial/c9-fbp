import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const MetadataNodeSchema = S.Struct({
  x: S.Optional(S.Int()),
  y: S.Optional(S.Int()),
})

export type MetadataNodeInput = S.InputOf<typeof MetadataNodeSchema>

export type MetadataNode = S.OutputOf<typeof MetadataNodeSchema>

export const MetadataNodeTranscoder = deriveTranscoder(MetadataNodeSchema)
