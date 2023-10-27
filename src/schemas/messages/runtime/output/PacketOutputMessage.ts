import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PacketOutputMessageSchema = RuntimeOutputMessageBaseSchema.intersect(S.Struct({
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

export type PacketOutputMessageInput = S.InputOf<typeof PacketOutputMessageSchema>

export type PacketOutputMessage = S.OutputOf<typeof PacketOutputMessageSchema>

export const PacketOutputMessageTranscoder = deriveTranscoder(PacketOutputMessageSchema)
