import * as S from 'schemata-ts'
import { BeginGroupNetworkOutputMessageSchema } from '#/schemas/messages/network/output/BeginGroupNetworkOutputMessage.ts'
import { ConnectNetworkOutputMessageSchema } from '#/schemas/messages/network/output/ConnectNetworkOutputMessage.ts'
import { DataNetworkOutputMessageSchema } from '#/schemas/messages/network/output/DataNetworkOutputMessage.ts'
import { DisconnectNetworkOutputMessageSchema } from '#/schemas/messages/network/output/DisconnectNetworkOutputMessage.ts'
import { EdgesNetworkOutputMessageSchema } from '#/schemas/messages/network/output/EdgesNetworkOutputMessage.ts'
import { EndGroupNetworkOutputMessageSchema } from '#/schemas/messages/network/output/EndGroupNetworkOutputMessage.ts'
import { ErrorNetworkOutputMessageSchema } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { IconNetworkOutputMessageSchema } from '#/schemas/messages/network/output/IconNetworkOutputMessage.ts'
import { OutputNetworkOutputMessageSchema } from '#/schemas/messages/network/output/OutputNetworkOutputMessage.ts'
import { ProcessErrorNetworkOutputMessageSchema } from '#/schemas/messages/network/output/ProcessErrorNetworkOutputMessage.ts'
import { StartedNetworkOutputMessageSchema } from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'
import { StatusNetworkOutputMessageSchema } from '#/schemas/messages/network/output/StatusNetworkOutputMessage.ts'
import { StoppedNetworkOutputMessageSchema } from '#/schemas/messages/network/output/StoppedNetworkOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const NetworkOutputMessageSchema = S.Union(
  BeginGroupNetworkOutputMessageSchema,
  ConnectNetworkOutputMessageSchema,
  DataNetworkOutputMessageSchema,
  DisconnectNetworkOutputMessageSchema,
  EdgesNetworkOutputMessageSchema,
  EndGroupNetworkOutputMessageSchema,
  ErrorNetworkOutputMessageSchema,
  IconNetworkOutputMessageSchema,
  OutputNetworkOutputMessageSchema,
  ProcessErrorNetworkOutputMessageSchema,
  StartedNetworkOutputMessageSchema,
  StatusNetworkOutputMessageSchema,
  StoppedNetworkOutputMessageSchema,
)

export type NetworkOutputMessageInput = S.InputOf<typeof NetworkOutputMessageSchema>

export type NetworkOutputMessage = S.OutputOf<typeof NetworkOutputMessageSchema>

export const NetworkOutputMessageTranscoder = deriveTranscoder(NetworkOutputMessageSchema)

export const NetworkOutputMessageInputGuard = deriveInputGuard(NetworkOutputMessageSchema)

export const NetworkOutputMessageGuard = deriveGuard(NetworkOutputMessageSchema)
