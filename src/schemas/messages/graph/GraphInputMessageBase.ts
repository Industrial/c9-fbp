import * as S from 'schemata-ts'

export type GraphInputMessageBaseInput = {
  protocol: 'graph'
}

export type GraphInputMessageBase = {
  protocol: 'graph'
}

export const GraphInputMessageBaseSchema = S.Struct({
  protocol: S.Literal<['graph']>('graph'),
})
