import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PortIDSchema = S.String()

export type PortIDInput = S.InputOf<typeof PortIDSchema>

export type PortID = S.OutputOf<typeof PortIDSchema>

export const PortIDTranscoder = deriveTranscoder(PortIDSchema)
