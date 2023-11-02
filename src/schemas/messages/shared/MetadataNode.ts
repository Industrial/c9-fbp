import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const MetadataNodeSchema = S.UnknownRecord

export type MetadataNodeInput = S.InputOf<typeof MetadataNodeSchema>

export type MetadataNode = S.OutputOf<typeof MetadataNodeSchema>

export const MetadataNodeTranscoder = deriveTranscoder(MetadataNodeSchema)

export const MetadataNodeInputGuard = deriveInputGuard(MetadataNodeSchema)

export const MetadataNodeGuard = deriveGuard(MetadataNodeSchema)
