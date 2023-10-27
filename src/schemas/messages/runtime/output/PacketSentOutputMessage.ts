import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const PacketsSentOutputMessageSchema = RuntimeInputMessageBaseSchema.intersect(S.Struct({
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

export type PacketsSentOutputMessageInput = S.InputOf<typeof PacketsSentOutputMessageSchema>

export type PacketsSentOutputMessage = S.OutputOf<typeof PacketsSentOutputMessageSchema>

export const PacketsSentOutputMessageTranscoder = deriveTranscoder(PacketsSentOutputMessageSchema)
