import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveEdgeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeedge']>('removeedge'),
    payload: S.Struct({
      src: S.Struct({
        node: NodeIDSchema,
        port: PortIDSchema,
      }),
      tgt: S.Struct({
        node: NodeIDSchema,
        port: PortIDSchema,
      }),
      graph: GraphIDSchema,
    }),
  })

export type RemoveEdgeOutputMessageInput = S.InputOf<typeof RemoveEdgeOutputMessageSchema>

export type RemoveEdgeOutputMessage = S.OutputOf<typeof RemoveEdgeOutputMessageSchema>

export const RemoveEdgeOutputMessageTranscoder = deriveTranscoder(RemoveEdgeOutputMessageSchema)

export const RemoveEdgeOutputMessageInputGuard = deriveInputGuard(RemoveEdgeOutputMessageSchema)

export const RemoveEdgeOutputMessageGuard = deriveGuard(RemoveEdgeOutputMessageSchema)
