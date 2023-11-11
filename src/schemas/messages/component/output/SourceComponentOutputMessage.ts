import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { ComponentOutputMessageBaseSchema } from '#/schemas/messages/component/ComponentOutputMessageBase.ts'

export const SourceComponentOutputMessageSchema = ComponentOutputMessageBaseSchema
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

export type SourceComponentOutputMessageInput = S.OutputOf<typeof SourceComponentOutputMessageSchema>

export type SourceComponentOutputMessage = S.OutputOf<typeof SourceComponentOutputMessageSchema>

export const SourceComponentOutputMessageTranscoder = deriveTranscoder(SourceComponentOutputMessageSchema)

export const SourceComponentOutputMessageInputGuard = deriveInputGuard(SourceComponentOutputMessageSchema)

export const SourceComponentOutputMessageGuard = deriveGuard(SourceComponentOutputMessageSchema)
