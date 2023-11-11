import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { ComponentOutputMessageBaseSchema } from '#/schemas/messages/component/ComponentOutputMessageBase.ts'

export const ErrorComponentOutputMessageSchema = ComponentOutputMessageBaseSchema
  .extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export type ErrorComponentOutputMessageInput = S.OutputOf<typeof ErrorComponentOutputMessageSchema>

export type ErrorComponentOutputMessage = S.OutputOf<typeof ErrorComponentOutputMessageSchema>

export const ErrorComponentOutputMessageTranscoder = deriveTranscoder(ErrorComponentOutputMessageSchema)

export const ErrorComponentOutputMessageInputGuard = deriveInputGuard(ErrorComponentOutputMessageSchema)

export const ErrorComponentOutputMessageGuard = deriveGuard(ErrorComponentOutputMessageSchema)
