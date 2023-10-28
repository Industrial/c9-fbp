import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessageBaseInput,
  RuntimeOutputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { PacketEvent, PacketEventInput, PacketEventSchema } from '#/schemas/messages/shared/PacketEvent.ts'

export type PacketOutputMessageInput = RuntimeOutputMessageBaseInput & {
  command: 'packet'
  payload: {
    message: string
    event: PacketEventInput
    graph: string
    payload: {}
    port: string
    schema: string
    type: string
  }
}

export type PacketOutputMessage = RuntimeOutputMessageBaseInput & {
  command: 'packet'
  payload: {
    message: string
    event: PacketEvent
    graph: string
    payload: {}
    port: string
    schema: string
    type: string
  }
}

export const PacketOutputMessageSchema: S.Schema<PacketOutputMessageInput, PacketOutputMessage> =
  RuntimeOutputMessageBaseSchema.extend({
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

export const GetRuntimeInputMessageTranscoder = deriveTranscoder(PacketOutputMessageSchema)
