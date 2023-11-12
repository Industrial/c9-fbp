import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const NetworkOutputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['network']>('network'),
})

export type NetworkOutputMessageBaseOutput = S.OutputOf<typeof NetworkOutputMessageBaseSchema>

export type NetworkOutputMessageBase = S.OutputOf<typeof NetworkOutputMessageBaseSchema>
