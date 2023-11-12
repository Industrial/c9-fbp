import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const ComponentInputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['component']>('component'),
})

export type ComponentInputMessageBaseInput = S.InputOf<typeof ComponentInputMessageBaseSchema>

export type ComponentInputMessageBase = S.OutputOf<typeof ComponentInputMessageBaseSchema>
