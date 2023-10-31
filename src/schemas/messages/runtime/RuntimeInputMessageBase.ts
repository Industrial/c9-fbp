import * as S from 'schemata-ts'

export type RuntimeInputMessageBaseInput = {
  protocol: 'runtime'
}

export type RuntimeInputMessageBase = {
  protocol: 'runtime'
}

export const RuntimeInputMessageBaseSchema = S.Struct({
  protocol: S.Literal<['runtime']>('runtime'),
})
