import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

import { GetRuntimeInputMessageSchema } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'

export const RuntimeInputMessageSchema = S.Union(
  GetRuntimeInputMessageSchema,
)

export type RuntimeInputMessageInput = S.InputOf<typeof RuntimeInputMessageSchema>

export type RuntimeInputMessage = S.OutputOf<typeof RuntimeInputMessageSchema>

export const RuntimeInputMessageTranscoder = deriveTranscoder(RuntimeInputMessageSchema)
