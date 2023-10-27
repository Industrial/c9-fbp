import * as S from 'schemata-ts/index.ts'
import type { Transcoder } from 'schemata-ts/Transcoder.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

export const StringValueSchema = S.Struct({
  type: S.Literal('StringValue'),
  name: S.String(),
})

export type StringValueInput = S.InputOf<typeof StringValueSchema>

export type StringValue = S.OutputOf<typeof StringValueSchema>

export const StringValueTranscoder: Transcoder<StringValueInput, StringValue> = deriveTranscoder(StringValueSchema)
