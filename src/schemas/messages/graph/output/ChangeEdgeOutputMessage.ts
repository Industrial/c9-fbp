import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeEdgeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changeedge']>('changeedge'),
    payload: S.Struct({
      src: S.Struct({
        node: NodeIDSchema,
        port: PortIDSchema,
      }),
      tgt: S.Struct({
        node: NodeIDSchema,
        port: PortIDSchema,
      }),
      metadata: MetadataEdgeSchema,
      graph: GraphIDSchema,
    }),
  })

export type ChangeEdgeOutputMessageInput = S.InputOf<typeof ChangeEdgeOutputMessageSchema>

export type ChangeEdgeOutputMessage = S.OutputOf<typeof ChangeEdgeOutputMessageSchema>

export const ChangeEdgeOutputMessageTranscoder = deriveTranscoder(ChangeEdgeOutputMessageSchema)

export const ChangeEdgeOutputMessageInputGuard = deriveInputGuard(ChangeEdgeOutputMessageSchema)

export const ChangeEdgeOutputMessageGuard = deriveGuard(ChangeEdgeOutputMessageSchema)
