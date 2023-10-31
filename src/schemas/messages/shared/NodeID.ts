import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const NodeIDSchema = S.String()

export type NodeIDInput = S.InputOf<typeof NodeIDSchema>

export type NodeID = S.OutputOf<typeof NodeIDSchema>

export const NodeIDTranscoder = deriveTranscoder(NodeIDSchema)
