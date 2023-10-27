import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GraphIDSchema = S.String()

export type GraphIDInput = S.InputOf<typeof GraphIDSchema>

export type GraphID = S.OutputOf<typeof GraphIDSchema>

export const GraphIDTranscoder = deriveTranscoder(GraphIDSchema)
