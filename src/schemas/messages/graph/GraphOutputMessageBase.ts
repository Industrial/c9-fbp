import * as S from 'schemata-ts'

export type GraphOutputMessageBaseInput = {
  protocol: 'graph'
}

export type GraphOutputMessageBase = {
  protocol: 'graph'
}

export const GraphOutputMessageBaseSchema = S.Struct({
  protocol: S.Literal<['graph']>('graph'),
})
