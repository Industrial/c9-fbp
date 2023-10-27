import * as S from 'schemata-ts/index.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

import { TaskBaseSchema } from '#/schemas/mod.ts'

export const RedeemTokenSchema = TaskBaseSchema.extend({
  type: S.Literal('RedeemTokenTask'),
  input: S.Struct({
    tokenAddress: S.String(),
    minimumTokenAmount: S.BigIntFromString,
  }),
  // output: S.Struct({
  //   redeemedTokenAmount: S.BigIntFromString,
  // }),
})

export type RedeemTokenInput = S.InputOf<typeof RedeemTokenSchema>

export type RedeemToken = S.OutputOf<typeof RedeemTokenSchema>

export const RedeemTokenTranscoder = deriveTranscoder(RedeemTokenSchema)
