import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { ComponentOutputMessageBaseSchema } from '#/schemas/messages/component/ComponentOutputMessageBase.ts'

export const ComponentsReadyComponentOutputMessageSchema = ComponentOutputMessageBaseSchema
  .extend({
    command: S.Literal<['componentsready']>('componentsready'),
    payload: S.Int(),
    responseTo: S.Optional(S.String()),
  })

export type ComponentsReadyComponentOutputMessageInput = S.OutputOf<typeof ComponentsReadyComponentOutputMessageSchema>

export type ComponentsReadyComponentOutputMessage = S.OutputOf<typeof ComponentsReadyComponentOutputMessageSchema>

export const ComponentsReadyComponentOutputMessageTranscoder = deriveTranscoder(
  ComponentsReadyComponentOutputMessageSchema,
)

export const ComponentsReadyComponentOutputMessageInputGuard = deriveInputGuard(
  ComponentsReadyComponentOutputMessageSchema,
)

export const ComponentsReadyComponentOutputMessageGuard = deriveGuard(ComponentsReadyComponentOutputMessageSchema)
