import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const IIPValueSchema = S.Struct({
  data: S.Nullable(S.Union(
    S.UnknownRecord,
    S.UnknownArray,
    S.String(),
    S.Number,
    S.Int(),
    S.Boolean,
  )),
})

export type IIPValueInput = S.InputOf<typeof IIPValueSchema>

export type IIPValue = S.OutputOf<typeof IIPValueSchema>

export const IIPValueTranscoder = deriveTranscoder(IIPValueSchema)
