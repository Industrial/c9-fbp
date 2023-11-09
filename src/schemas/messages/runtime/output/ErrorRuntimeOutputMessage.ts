import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'

export const ErrorRuntimeOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['error']>('error'),
  payload: S.Struct({
    message: S.String(),
  }),
})

export type ErrorRuntimeOutputMessageInput = S.InputOf<typeof ErrorRuntimeOutputMessageSchema>

export type ErrorRuntimeOutputMessage = S.OutputOf<typeof ErrorRuntimeOutputMessageSchema>

export const ErrorRuntimeOutputInputMessageTranscoder = deriveTranscoder(ErrorRuntimeOutputMessageSchema)

export const ErrorRuntimeOutputMessageInputGuard = deriveInputGuard(ErrorRuntimeOutputMessageSchema)

export const ErrorRuntimeOutputMessageGuard = deriveGuard(ErrorRuntimeOutputMessageSchema)
