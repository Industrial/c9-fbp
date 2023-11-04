import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const GraphInputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['graph']>('graph'),
})

export type GraphInputMessageBaseInput = S.InputOf<typeof GraphInputMessageBaseSchema>

export type GraphInputMessageBase = S.OutputOf<typeof GraphInputMessageBaseSchema>
