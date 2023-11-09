import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketRuntimeOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
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

export type PacketRuntimeOutputMessageInput = S.InputOf<typeof PacketRuntimeOutputMessageSchema>

export type PacketRuntimeOutputMessage = S.OutputOf<typeof PacketRuntimeOutputMessageSchema>

export const PacketRuntimeOutputInputMessageTranscoder = deriveTranscoder(PacketRuntimeOutputMessageSchema)

export const PacketRuntimeOutputMessageInputGuard = deriveInputGuard(PacketRuntimeOutputMessageSchema)

export const PacketRuntimeOutputMessageGuard = deriveGuard(PacketRuntimeOutputMessageSchema)
