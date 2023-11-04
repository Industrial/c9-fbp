import * as S from 'schemata-ts'
import { ErrorOutputMessageSchema } from '#/schemas/messages/runtime/output/ErrorOutputMessage.ts'
import { PacketOutputMessageSchema } from '#/schemas/messages/runtime/output/PacketOutputMessage.ts'
import { PacketSentOutputMessageSchema } from '#/schemas/messages/runtime/output/PacketSentOutputMessage.ts'
import { PortsOutputMessageSchema } from '#/schemas/messages/runtime/output/PortsOutputMessage.ts'
import { RuntimeOutputMessageSchema as RuntimeRuntimeOutputMessageSchema } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RuntimeOutputMessageSchema = S.Union(
  ErrorOutputMessageSchema,
  PacketOutputMessageSchema,
  PacketSentOutputMessageSchema,
  PortsOutputMessageSchema,
  RuntimeRuntimeOutputMessageSchema,
)

export type RuntimeOutputMessageInput = S.TypeOf<typeof RuntimeOutputMessageSchema>

export type RuntimeOutputMessage = S.TypeOf<typeof RuntimeOutputMessageSchema>

export const RuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)

export const RuntimeOutputMessageOutputGuard = deriveInputGuard(RuntimeOutputMessageSchema)

export const RuntimeOutputMessageGuard = deriveGuard(RuntimeOutputMessageSchema)
