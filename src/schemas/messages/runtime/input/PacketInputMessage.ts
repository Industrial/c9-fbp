import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketInputMessageSchema = RuntimeInputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal('packet'),
  payload: S.Struct({
    event: S.Union(
      S.Literal('connect'),
      S.Literal('begingroup'),
      S.Literal('data'),
      S.Literal('endgroup'),
      S.Literal('disconnect'),
    ),
    graph: GraphIDSchema,
    payload: S.Struct({}),
    port: PortIDSchema,
    schema: S.String(),
    type: S.String(),
  }),
}))

export type PacketInputMessageInput = S.InputOf<typeof PacketInputMessageSchema>

export type PacketInputMessage = S.OutputOf<typeof PacketInputMessageSchema>

export const PacketInputMessageTranscoder = deriveTranscoder(PacketInputMessageSchema)
