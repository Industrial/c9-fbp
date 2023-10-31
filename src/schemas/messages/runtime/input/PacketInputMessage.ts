import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PacketEvent, PacketEventInput, PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import {
  RuntimeInputMessageBase,
  RuntimeInputMessageBaseInput,
  RuntimeInputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type PacketInputMessageInput = RuntimeInputMessageBaseInput & {
  command: 'packet'
  payload: {
    event: PacketEventInput
    graph: string
    payload: {}
    port: string
    schema: string
    type: string
  }
}

export type PacketInputMessage = RuntimeInputMessageBase & {
  command: 'packet'
  payload: {
    event: PacketEvent
    graph: string
    payload: {}
    port: string
    schema: string
    type: string
  }
}

export const PacketInputMessageSchema: S.Schema<PacketInputMessageInput, PacketInputMessage> =
  RuntimeInputMessageBaseSchema.intersect(S.Struct({
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

export const PacketInputMessageTranscoder = deriveTranscoder(PacketInputMessageSchema)

export const PacketInputMessageInputGuard = deriveInputGuard(PacketInputMessageSchema)

export const PacketInputMessageGuard = deriveGuard(PacketInputMessageSchema)
