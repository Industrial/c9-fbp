import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

import { TaskBaseSchema } from '#/schemas/mod.ts'

export const HarvestFarmSchema = TaskBaseSchema.extend({
  type: S.Literal('HarvestFarmTask'),
  input: S.Struct({
    contractAddress: S.String(),
    minimumReward: S.BigIntFromString,
  }),
  // output: S.Struct({
  //   reward: S.BigIntFromString,
  // }),
})

export type HarvestFarmInput = S.InputOf<typeof HarvestFarmSchema>

export type HarvestFarm = S.OutputOf<typeof HarvestFarmSchema>

export const HarvestFarmTranscoder = deriveTranscoder(HarvestFarmSchema)
