import * as S from 'schemata-ts'
import { GetRuntimeRuntimeInputMessageSchema } from './input/GetRuntimeRuntimeInputMessage.ts'
import { PacketRuntimeInputMessageSchema } from './input/PacketRuntimeInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RuntimeInputMessageSchema = S.Union(
  GetRuntimeRuntimeInputMessageSchema,
  PacketRuntimeInputMessageSchema,
)

export type RuntimeInputMessageInput = S.InputOf<typeof RuntimeInputMessageSchema>

export type RuntimeInputMessage = S.OutputOf<typeof RuntimeInputMessageSchema>

export const RuntimeInputMessageTranscoder = deriveTranscoder(RuntimeInputMessageSchema)

export const RuntimeInputMessageInputGuard = deriveInputGuard(RuntimeInputMessageSchema)

export const RuntimeInputMessageGuard = deriveGuard(RuntimeInputMessageSchema)
