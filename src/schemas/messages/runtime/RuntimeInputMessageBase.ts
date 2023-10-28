import * as S from 'schemata-ts'

export const RuntimeInputMessageBaseSchema = S.Struct({
  protocol: S.Literal('runtime'),
})

export type RuntimeInputMessageBaseInput = S.InputOf<typeof RuntimeInputMessageBaseSchema>

export type RuntimeInputMessageBase = S.OutputOf<typeof RuntimeInputMessageBaseSchema>
