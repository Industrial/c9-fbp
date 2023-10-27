import * as S from 'schemata-ts'

export const RuntimeOutputMessageBaseSchema = S.Struct({
  protocol: S.Literal('runtime'),
})
