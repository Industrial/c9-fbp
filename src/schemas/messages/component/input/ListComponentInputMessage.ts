import * as S from 'schemata-ts'
import { ComponentInputMessageBaseSchema } from '#/schemas/messages/component/ComponentInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ListComponentInputMessageSchema = ComponentInputMessageBaseSchema
  .extend({
    command: S.Literal<['list']>('list'),
    payload: S.Struct({}),
  })

export type ListComponentInputMessageInput = S.InputOf<typeof ListComponentInputMessageSchema>

export type ListComponentInputMessage = S.OutputOf<typeof ListComponentInputMessageSchema>

export const ListComponentInputMessageTranscoder = deriveTranscoder(ListComponentInputMessageSchema)

export const ListComponentInputMessageInputGuard = deriveInputGuard(ListComponentInputMessageSchema)

export const ListComponentInputMessageGuard = deriveGuard(ListComponentInputMessageSchema)
