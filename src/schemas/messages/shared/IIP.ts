import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const IIPSchema = S.Struct({
  data: S.Nullable(S.Union(
    S.UnknownRecord,
    S.UnknownArray,
    S.String(),
    S.Number,
    S.Int(),
    S.Boolean,
  )),
})

export type IIPInput = S.InputOf<typeof IIPSchema>

export type IIP = S.OutputOf<typeof IIPSchema>

export const IIPTranscoder = deriveTranscoder(IIPSchema)
