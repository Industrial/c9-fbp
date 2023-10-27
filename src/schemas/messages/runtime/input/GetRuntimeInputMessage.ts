import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'

export const GetRuntimeInputMessageSchema = RuntimeInputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal('getruntime'),
  payload: S.Struct({
    secret: S.String(),
  }),
}))

export type GetRuntimeInputMessageInput = S.InputOf<typeof GetRuntimeInputMessageSchema>

export type GetRuntimeInputMessage = S.OutputOf<typeof GetRuntimeInputMessageSchema>

export const GetRuntimeInputMessageTranscoder = deriveTranscoder(GetRuntimeInputMessageSchema)
