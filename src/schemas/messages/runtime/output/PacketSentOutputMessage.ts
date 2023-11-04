import * as S from 'schemata-ts'
import { PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketSentOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['packetsent']>('packetsent'),
  payload: S.Struct({
    port: PortIDSchema,
    event: PacketEventSchema,
    message: S.String(),
  }),
})

export const PacketSentOutputMessageTranscoder = deriveTranscoder(PacketSentOutputMessageSchema)

export type PacketSentOutputMessageInput = S.InputOf<typeof PacketSentOutputMessageSchema>

export type PacketSentOutputMessage = S.OutputOf<typeof PacketSentOutputMessageSchema>

export const PacketSentOutputInputMessageTranscoder = deriveTranscoder(PacketSentOutputMessageSchema)

export const PacketSentInputMessageInputGuard = deriveInputGuard(PacketSentOutputMessageSchema)

export const PacketSentInputMessageGuard = deriveGuard(PacketSentOutputMessageSchema)
