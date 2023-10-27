import * as S from 'schemata-ts/index.ts'
import type { Transcoder } from 'schemata-ts/Transcoder.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

export const BigIntValueSchema = S.Struct({
  type: S.Literal('BigIntValue'),
  name: S.String(),
})

export type BigIntValueInput = S.InputOf<typeof BigIntValueSchema>

export type BigIntValue = S.OutputOf<typeof BigIntValueSchema>

export const BigIntValueTranscoder: Transcoder<BigIntValueInput, BigIntValue> = deriveTranscoder(BigIntValueSchema)
