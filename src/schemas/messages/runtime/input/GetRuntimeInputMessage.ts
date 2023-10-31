import * as S from 'schemata-ts'
import {
  RuntimeInputMessageBase,
  RuntimeInputMessageBaseInput,
  RuntimeInputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

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

export const GetRuntimeInputMessageInputGuard = deriveInputGuard(GetRuntimeInputMessageSchema)

export const GetRuntimeInputMessageGuard = deriveGuard(GetRuntimeInputMessageSchema)
