import * as S from 'schemata-ts'
import { DebugNetworkInputMessageSchema } from '#/schemas/messages/network/input/DebugNetworkInputMessage.ts'
import { EdgesNetworkInputMessageSchema } from '#/schemas/messages/network/input/EdgesNetworkInputMessage.ts'
import { GetStatusNetworkInputMessageSchema } from '#/schemas/messages/network/input/GetStatusNetworkInputMessage.ts'
import { PersistNetworkInputMessageSchema } from '#/schemas/messages/network/input/PersistNetworkInputMessage.ts'
import { StartNetworkInputMessageSchema } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import { StopNetworkInputMessageSchema } from '#/schemas/messages/network/input/StopNetworkInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const NetworkInputMessageSchema = S.Union(
  DebugNetworkInputMessageSchema,
  EdgesNetworkInputMessageSchema,
  GetStatusNetworkInputMessageSchema,
  PersistNetworkInputMessageSchema,
  StartNetworkInputMessageSchema,
  StopNetworkInputMessageSchema,
)

export type NetworkInputMessageInput = S.InputOf<typeof NetworkInputMessageSchema>

export type NetworkInputMessage = S.OutputOf<typeof NetworkInputMessageSchema>

export const NetworkInputMessageTranscoder = deriveTranscoder(NetworkInputMessageSchema)

export const NetworkInputMessageInputGuard = deriveInputGuard(NetworkInputMessageSchema)

export const NetworkInputMessageGuard = deriveGuard(NetworkInputMessageSchema)
