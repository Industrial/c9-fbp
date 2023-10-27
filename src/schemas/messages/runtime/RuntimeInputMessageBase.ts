import * as S from 'schemata-ts'

export const RuntimeInputMessageBaseSchema = S.Struct({
  protocol: S.Literal('runtime'),
})
