import * as S from 'schemata-ts/index.ts'
import type { Transcoder } from 'schemata-ts/Transcoder.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

import { AddressValueSchema } from '#/schemas/AddressValue.ts'
import { BigIntValueSchema } from '#/schemas/BigIntValue.ts'
import { BooleanValueSchema } from '#/schemas/BooleanValue.ts'
import { StringValueSchema } from '#/schemas/StringValue.ts'

export const ValueSchema = S.Union(AddressValueSchema, BigIntValueSchema, BooleanValueSchema, StringValueSchema)

export type ValueInput = S.InputOf<typeof ValueSchema>

export type Value = S.OutputOf<typeof ValueSchema>

export const ValueTranscoder: Transcoder<ValueInput, Value> = deriveTranscoder(ValueSchema)
