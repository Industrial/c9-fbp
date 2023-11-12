import * as S from 'schemata-ts'
import { ValueSchema } from '#/schemas/messages/shared/Value.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const IIPValueSchema = S.Struct({
  data: S.Nullable(ValueSchema),
})

export type IIPValueInput = S.InputOf<typeof IIPValueSchema>

export type IIPValue = S.OutputOf<typeof IIPValueSchema>

export const IIPValueTranscoder = deriveTranscoder(IIPValueSchema)
