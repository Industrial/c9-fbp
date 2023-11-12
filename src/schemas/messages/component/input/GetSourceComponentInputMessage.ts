import * as S from 'schemata-ts'
import { ComponentInputMessageBaseSchema } from '#/schemas/messages/component/ComponentInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GetSourceComponentInputMessageSchema = ComponentInputMessageBaseSchema
  .extend({
    command: S.Literal<['getsource']>('getsource'),
    payload: S.Struct({
      name: S.String(),
    }),
  })

export type GetSourceComponentInputMessageInput = S.InputOf<typeof GetSourceComponentInputMessageSchema>

export type GetSourceComponentInputMessage = S.OutputOf<typeof GetSourceComponentInputMessageSchema>

export const GetSourceComponentInputMessageTranscoder = deriveTranscoder(GetSourceComponentInputMessageSchema)

export const GetSourceComponentInputMessageInputGuard = deriveInputGuard(GetSourceComponentInputMessageSchema)

export const GetSourceComponentInputMessageGuard = deriveGuard(GetSourceComponentInputMessageSchema)
