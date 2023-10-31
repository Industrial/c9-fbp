import * as S from 'schemata-ts'

export type RuntimeOutputMessageBaseInput = {
  protocol: 'runtime'
}

export type RuntimeOutputMessageBase = {
  protocol: 'runtime'
}

export const RuntimeOutputMessageBaseSchema = S.Struct({
  protocol: S.Literal<['runtime']>('runtime'),
})
