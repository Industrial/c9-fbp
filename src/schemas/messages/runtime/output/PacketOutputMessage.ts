import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['packet']>('packet'),
  payload: S.Struct({
    message: S.String(),
    event: PacketEventSchema,
    graph: GraphIDSchema,
    payload: S.Struct({}),
    port: PortIDSchema,
    schema: S.String(),
    type: S.String(),
  }),
})

export type PacketOutputMessageInput = S.InputOf<typeof PacketOutputMessageSchema>

export type PacketOutputMessage = S.OutputOf<typeof PacketOutputMessageSchema>

export const PacketOutputInputMessageTranscoder = deriveTranscoder(PacketOutputMessageSchema)

export const PacketInputMessageInputGuard = deriveInputGuard(PacketOutputMessageSchema)

export const PacketInputMessageGuard = deriveGuard(PacketOutputMessageSchema)
