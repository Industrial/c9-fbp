import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

import {
  GetRuntimeInputMessage,
  GetRuntimeInputMessageInput,
  GetRuntimeInputMessageSchema,
} from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import {
  PacketInputMessage,
  PacketInputMessageInput,
  PacketInputMessageSchema,
} from '#/schemas/messages/runtime/input/PacketInputMessage.ts'

export type RuntimeInputMessageInput =
  | GetRuntimeInputMessageInput
  | PacketInputMessageInput

export type RuntimeInputMessage =
  | GetRuntimeInputMessage
  | PacketInputMessage

export const RuntimeInputMessageSchema: S.Schema<RuntimeInputMessageInput, RuntimeInputMessage> = S.Union(
  GetRuntimeInputMessageSchema,
  PacketInputMessageSchema,
)

export const RuntimeInputMessageTranscoder = deriveTranscoder(RuntimeInputMessageSchema)
