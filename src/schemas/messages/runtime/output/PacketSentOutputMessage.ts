import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessageBaseInput,
  RuntimeOutputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { PacketEvent, PacketEventInput, PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortID, PortIDInput, PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export type PacketSentOutputMessageInput = RuntimeOutputMessageBaseInput & {
  command: 'packetsent'
  payload: {
    port: PortIDInput
    event: PacketEventInput
    message: string
  }
}

export type PacketSentOutputMessage = RuntimeOutputMessageBaseInput & {
  command: 'packetsent'
  payload: {
    port: PortID
    event: PacketEvent
    message: string
  }
}

export const PacketSentOutputMessageSchema: S.Schema<PacketSentOutputMessageInput, PacketSentOutputMessage> =
  RuntimeOutputMessageBaseSchema.extend({
    command: S.Literal<['packetsent']>('packetsent'),
    payload: S.Struct({
      port: PortIDSchema,
      event: PacketEventSchema,
      message: S.String(),
    }),
  })

export const PacketSentOutputMessageTranscoder = deriveTranscoder(PacketSentOutputMessageSchema)
