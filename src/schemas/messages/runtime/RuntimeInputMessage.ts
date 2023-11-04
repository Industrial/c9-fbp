import * as S from 'schemata-ts'
import { GetRuntimeInputMessageSchema } from '#/schemas/messages/runtime/input/GetRuntimeInputMessage.ts'
import { PacketInputMessageSchema } from '#/schemas/messages/runtime/input/PacketInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RuntimeInputMessageSchema = S.Union(
  GetRuntimeInputMessageSchema,
  PacketInputMessageSchema,
)

export type RuntimeInputMessageInput = S.InputOf<typeof RuntimeInputMessageSchema>

export type RuntimeInputMessage = S.OutputOf<typeof RuntimeInputMessageSchema>

export const RuntimeInputMessageTranscoder = deriveTranscoder(RuntimeInputMessageSchema)

export const RuntimeInputMessageInputGuard = deriveInputGuard(RuntimeInputMessageSchema)

export const RuntimeInputMessageGuard = deriveGuard(RuntimeInputMessageSchema)
