import * as S from 'schemata-ts/index.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

import { HarvestFarmSchema } from '#/schemas/HarvestFarmTask.ts'
import { IncreasePoolTaskSchema } from '#/schemas/IncreasePoolTask.ts'
import { ParallelTaskSchema } from '#/schemas/ParallelTask.ts'
import { RedeemTokenSchema } from '#/schemas/RedeemTokenTask.ts'
import { SerialTaskSchema } from '#/schemas/SerialTask.ts'

export const TaskSchema = S.Union(
  SerialTaskSchema,
  ParallelTaskSchema,
  HarvestFarmSchema,
  IncreasePoolTaskSchema,
  RedeemTokenSchema,
)

export type TaskInput = S.InputOf<typeof TaskSchema>

export type Task = S.OutputOf<typeof TaskSchema>

export const TaskTranscoder = deriveTranscoder(TaskSchema)
