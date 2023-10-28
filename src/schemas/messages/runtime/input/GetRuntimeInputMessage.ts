import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeInputMessageBase,
  RuntimeInputMessageBaseInput,
  RuntimeInputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'

export type GetRuntimeInputMessageInput = RuntimeInputMessageBaseInput & {
  command: 'getruntime'
  payload: {
    secret?: string
  }
}

export type GetRuntimeInputMessage = RuntimeInputMessageBase & {
  command: 'getruntime'
  payload: {
    secret: string | undefined
  }
}

export const GetRuntimeInputMessageSchema: S.Schema<GetRuntimeInputMessageInput, GetRuntimeInputMessage> =
  RuntimeInputMessageBaseSchema.extend({
    command: S.Literal<['getruntime']>('getruntime'),
    payload: S.Struct({
      secret: S.Optional(S.String()),
    }),
  })

export const GetRuntimeInputMessageTranscoder = deriveTranscoder(GetRuntimeInputMessageSchema)
