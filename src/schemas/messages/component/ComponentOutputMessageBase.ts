import * as S from 'schemata-ts'
import { MessageBaseSchema } from '#/schemas/messages/MessageBase.ts'

export const ComponentOutputMessageBaseSchema = MessageBaseSchema.extend({
  protocol: S.Literal<['component']>('component'),
})

export type ComponentOutputMessageBaseOutput = S.OutputOf<typeof ComponentOutputMessageBaseSchema>

export type ComponentOutputMessageBase = S.OutputOf<typeof ComponentOutputMessageBaseSchema>
