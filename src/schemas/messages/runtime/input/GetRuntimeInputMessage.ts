import * as S from 'schemata-ts'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GetRuntimeInputMessageSchema = RuntimeInputMessageBaseSchema.extend({
  command: S.Literal<['getruntime']>('getruntime'),
  payload: S.Struct({
    secret: S.Optional(S.String()),
  }),
})

export type GetRuntimeInputMessageInput = S.InputOf<typeof GetRuntimeInputMessageSchema>

export type GetRuntimeInputMessage = S.OutputOf<typeof GetRuntimeInputMessageSchema>

export const GetRuntimeInputMessageTranscoder = deriveTranscoder(GetRuntimeInputMessageSchema)

export const GetRuntimeInputMessageInputGuard = deriveInputGuard(GetRuntimeInputMessageSchema)

export const GetRuntimeInputMessageGuard = deriveGuard(GetRuntimeInputMessageSchema)
