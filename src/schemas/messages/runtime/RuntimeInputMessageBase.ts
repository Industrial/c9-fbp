import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const RuntimeInputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['runtime']>('runtime'),
})

export type RuntimeInputMessageBaseInput = S.InputOf<typeof RuntimeInputMessageBaseSchema>

export type RuntimeInputMessageBase = S.OutputOf<typeof RuntimeInputMessageBaseSchema>
