import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketInputMessageSchema = RuntimeInputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal<['packet']>('packet'),
  payload: S.Struct({
    event: PacketEventSchema,
    graph: GraphIDSchema,
    payload: S.Struct({}),
    port: PortIDSchema,
    schema: S.String(),
    type: S.String(),
  }),
}))

export type PacketInputMessageInput = S.InputOf<typeof PacketEventSchema>

export type PacketInputMessage = S.OutputOf<typeof PacketEventSchema>

export const PacketInputMessageTranscoder = deriveTranscoder(PacketInputMessageSchema)

export const PacketInputMessageInputGuard = deriveInputGuard(PacketInputMessageSchema)

export const PacketInputMessageGuard = deriveGuard(PacketInputMessageSchema)
