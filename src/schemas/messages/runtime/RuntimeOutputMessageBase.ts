import * as S from 'schemata-ts'

export const RuntimeOutputMessageBaseSchema = S.Struct({
  protocol: S.Literal('runtime'),
})

export type RuntimeOutputMessageBaseInput = S.OutputOf<typeof RuntimeOutputMessageBaseSchema>

export type RuntimeOutputMessageBase = S.OutputOf<typeof RuntimeOutputMessageBaseSchema>
