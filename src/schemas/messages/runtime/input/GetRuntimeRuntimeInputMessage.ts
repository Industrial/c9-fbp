import * as S from 'schemata-ts'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GetRuntimeRuntimeInputMessageSchema = RuntimeInputMessageBaseSchema.extend({
  command: S.Literal<['getruntime']>('getruntime'),
  payload: S.Struct({
    secret: S.Optional(S.String()),
  }),
})

export type GetRuntimeRuntimeInputMessageInput = S.InputOf<typeof GetRuntimeRuntimeInputMessageSchema>

export type GetRuntimeRuntimeInputMessage = S.OutputOf<typeof GetRuntimeRuntimeInputMessageSchema>

export const GetRuntimeRuntimeInputMessageTranscoder = deriveTranscoder(GetRuntimeRuntimeInputMessageSchema)

export const GetRuntimeRuntimeInputMessageInputGuard = deriveInputGuard(GetRuntimeRuntimeInputMessageSchema)

export const GetRuntimeRuntimeInputMessageGuard = deriveGuard(GetRuntimeRuntimeInputMessageSchema)
