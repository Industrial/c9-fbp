import * as S from 'schemata-ts/index.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

import { TaskBaseSchema } from '#/schemas/mod.ts'

export const IncreasePoolTaskSchema = TaskBaseSchema.extend({
  type: S.Literal('IncreasePoolTask'),
  input: S.Struct({
    tokenContractAddress: S.String(),
    minimumTokenAmount: S.BigIntFromString,
  }),
  // output: S.Struct({
  //   poolTokenAmount: S.BigIntFromString,
  //   poolRewardAmount: S.BigIntFromString,
  // }),
})

export type IncreasePoolTaskInput = S.InputOf<typeof IncreasePoolTaskSchema>

export type IncreasePoolTask = S.OutputOf<typeof IncreasePoolTaskSchema>

export const IncreasePoolTaskTranscoder = deriveTranscoder(IncreasePoolTaskSchema)
