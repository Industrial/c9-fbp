import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

import {
  PacketSentOutputMessage,
  PacketSentOutputMessageInput,
  PacketSentOutputMessageSchema,
} from '#/schemas/messages/runtime/output/PacketSentOutputMessage.ts'
import {
  PortsOutputMessage,
  PortsOutputMessageInput,
  PortsOutputMessageSchema,
} from '#/schemas/messages/runtime/output/PortsOutputMessage.ts'
import {
  ErrorOutputMessage,
  ErrorOutputMessageInput,
  ErrorOutputMessageSchema,
} from '#/schemas/messages/runtime/output/ErrorOutputMessage.ts'
import {
  PacketOutputMessage,
  PacketOutputMessageInput,
  PacketOutputMessageSchema,
} from '#/schemas/messages/runtime/output/PacketOutputMessage.ts'
import {
  RuntimeOutputMessage as RuntimeRuntimeOutputMessage,
  RuntimeOutputMessageInput as RuntimeRuntimeOutputMessageInput,
  RuntimeOutputMessageSchema as RuntimeRuntimeOutputMessageSchema,
} from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'

export type RuntimeOutputMessageInput =
  | ErrorOutputMessageInput
  | PacketOutputMessageInput
  | PacketSentOutputMessageInput
  | PortsOutputMessageInput
  | RuntimeRuntimeOutputMessageInput

export type RuntimeOutputMessage =
  | ErrorOutputMessage
  | PacketOutputMessage
  | PacketSentOutputMessage
  | PortsOutputMessage
  | RuntimeRuntimeOutputMessage

export const RuntimeOutputMessageSchema: S.Schema<RuntimeOutputMessageInput, RuntimeOutputMessage> = S.Union(
  ErrorOutputMessageSchema,
  PacketOutputMessageSchema,
  PacketSentOutputMessageSchema,
  PortsOutputMessageSchema,
  RuntimeRuntimeOutputMessageSchema,
)

export const RuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)
