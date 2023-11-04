import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const RuntimeOutputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['runtime']>('runtime'),
})

export type RuntimeOutputMessageBaseInput = S.OutputOf<typeof RuntimeOutputMessageBaseSchema>

export type RuntimeOutputMessageBase = S.OutputOf<typeof RuntimeOutputMessageBaseSchema>
