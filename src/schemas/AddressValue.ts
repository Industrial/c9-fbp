import * as S from 'schemata-ts/index.ts'
import type { Transcoder } from 'schemata-ts/Transcoder.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

export const AddressValueSchema = S.Struct({
  type: S.Literal('AddressValue'),
  name: S.String(),
})

export type AddressValueInput = S.InputOf<typeof AddressValueSchema>

export type AddressValue = S.OutputOf<typeof AddressValueSchema>

export const AddressValueTranscoder: Transcoder<AddressValueInput, AddressValue> = deriveTranscoder(AddressValueSchema)
