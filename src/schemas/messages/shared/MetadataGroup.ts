import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const MetadataGroupSchema = S.Struct({
  description: S.String(),
})

export type MetadataGroupInput = S.InputOf<typeof MetadataGroupSchema>

export type MetadataGroup = S.OutputOf<typeof MetadataGroupSchema>

export const MetadataGroupTranscoder = deriveTranscoder(MetadataGroupSchema)

export const MetadataGroupInputGuard = deriveInputGuard(MetadataGroupSchema)

export const MetadataGroupGuard = deriveGuard(MetadataGroupSchema)
