import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const GraphOutputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['graph']>('graph'),
})

export type GraphOutputMessageBaseOutput = S.OutputOf<typeof GraphOutputMessageBaseSchema>

export type GraphOutputMessageBase = S.OutputOf<typeof GraphOutputMessageBaseSchema>
