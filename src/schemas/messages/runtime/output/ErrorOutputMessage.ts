import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'

export const ErrorOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['error']>('error'),
  payload: S.Struct({
    message: S.String(),
  }),
})

export type ErrorOutputMessageInput = S.InputOf<typeof ErrorOutputMessageSchema>

export type ErrorOutputMessage = S.OutputOf<typeof ErrorOutputMessageSchema>

export const ErrorOutputInputMessageTranscoder = deriveTranscoder(ErrorOutputMessageSchema)

export const PacketInputMessageInputGuard = deriveInputGuard(ErrorOutputMessageSchema)

export const PacketInputMessageGuard = deriveGuard(ErrorOutputMessageSchema)
