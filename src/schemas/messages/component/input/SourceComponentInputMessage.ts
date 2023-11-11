import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { ComponentInputMessageBaseSchema } from '#/schemas/messages/component/ComponentInputMessageBase.ts'

export const SourceComponentInputMessageSchema = ComponentInputMessageBaseSchema
  .extend({
    command: S.Literal<['source']>('source'),
    payload: S.Struct({
      name: S.String(),
      language: S.String(),
      code: S.String(),
      library: S.Optional(S.String()),
      tests: S.Optional(S.String()),
    }),
  })

export type SourceComponentInputMessageInput = S.InputOf<typeof SourceComponentInputMessageSchema>

export type SourceComponentInputMessage = S.OutputOf<typeof SourceComponentInputMessageSchema>

export const SourceComponentInputMessageTranscoder = deriveTranscoder(SourceComponentInputMessageSchema)

export const SourceComponentInputMessageInputGuard = deriveInputGuard(SourceComponentInputMessageSchema)

export const SourceComponentInputMessageGuard = deriveGuard(SourceComponentInputMessageSchema)
