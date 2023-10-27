import * as S from 'schemata-ts/index.ts'

export const TaskBaseSchema = S.Struct({
  input: S.Struct({}),
  // output: S.Struct({}),
})

export type TaskBaseInput = S.InputOf<typeof TaskBaseSchema>

export type TaskBase = S.TypeOf<typeof TaskBaseSchema>
