import * as S from 'schemata-ts'
import { ErrorRuntimeOutputMessageSchema } from '#/schemas/messages/runtime/output/ErrorRuntimeOutputMessage.ts'
import { PacketRuntimeOutputMessageSchema } from '#/schemas/messages/runtime/output/PacketRuntimeOutputMessage.ts'
import { PacketSentRuntimeOutputMessageSchema } from '#/schemas/messages/runtime/output/PacketSentRuntimeOutputMessage.ts'
import { PortsOutputRuntimeMessageSchema } from '#/schemas/messages/runtime/output/PortsRuntimeOutputMessage.ts'
import { RuntimeRuntimeOutputMessageSchema as RuntimeRuntimeOutputMessageSchema } from '#/schemas/messages/runtime/output/RuntimeRuntimeOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RuntimeOutputMessageSchema = S.Union(
  ErrorRuntimeOutputMessageSchema,
  PacketRuntimeOutputMessageSchema,
  PacketSentRuntimeOutputMessageSchema,
  PortsOutputRuntimeMessageSchema,
  RuntimeRuntimeOutputMessageSchema,
)

export type RuntimeOutputMessageInput = S.TypeOf<typeof RuntimeOutputMessageSchema>

export type RuntimeOutputMessage = S.TypeOf<typeof RuntimeOutputMessageSchema>

export const RuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)

export const RuntimeOutputMessageOutputGuard = deriveInputGuard(RuntimeOutputMessageSchema)

export const RuntimeOutputMessageGuard = deriveGuard(RuntimeOutputMessageSchema)
