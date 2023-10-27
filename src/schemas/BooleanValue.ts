import * as S from 'schemata-ts/index.ts'
import type { Transcoder } from 'schemata-ts/Transcoder.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

export const BooleanValueSchema = S.Struct({
  type: S.Literal('BooleanValue'),
  name: S.String(),
})

export type BooleanValueInput = S.InputOf<typeof BooleanValueSchema>

export type BooleanValue = S.OutputOf<typeof BooleanValueSchema>

export const BooleanValueTranscoder: Transcoder<BooleanValueInput, BooleanValue> = deriveTranscoder(BooleanValueSchema)
