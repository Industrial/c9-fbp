import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const NetworkInputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['network']>('network'),
})

export type NetworkInputMessageBaseInput = S.InputOf<typeof NetworkInputMessageBaseSchema>

export type NetworkInputMessageBase = S.OutputOf<typeof NetworkInputMessageBaseSchema>
