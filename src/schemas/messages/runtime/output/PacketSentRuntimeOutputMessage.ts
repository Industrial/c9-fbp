import * as S from 'schemata-ts'
import { PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketSentRuntimeOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['packetsent']>('packetsent'),
  payload: S.Struct({
    port: PortIDSchema,
    event: PacketEventSchema,
    message: S.String(),
  }),
})

export const PacketSentRuntimeOutputMessageTranscoder = deriveTranscoder(PacketSentRuntimeOutputMessageSchema)

export type PacketSentRuntimeOutputMessageInput = S.InputOf<typeof PacketSentRuntimeOutputMessageSchema>

export type PacketSentRuntimeOutputMessage = S.OutputOf<typeof PacketSentRuntimeOutputMessageSchema>

export const PacketSentRuntimeOutputMessageInputGuard = deriveInputGuard(PacketSentRuntimeOutputMessageSchema)

export const PacketSentRuntimeOutputMessageGuard = deriveGuard(PacketSentRuntimeOutputMessageSchema)
