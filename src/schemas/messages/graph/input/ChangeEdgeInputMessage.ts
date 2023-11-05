import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const ChangeEdgeInputMessageSchema = GraphInputMessageBaseSchema
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

export type ChangeEdgeInputMessageInput = S.InputOf<typeof ChangeEdgeInputMessageSchema>

export type ChangeEdgeInputMessage = S.OutputOf<typeof ChangeEdgeInputMessageSchema>

export const ChangeEdgeInputMessageTranscoder = deriveTranscoder(ChangeEdgeInputMessageSchema)

export const ChangeEdgeInputMessageInputGuard = deriveInputGuard(ChangeEdgeInputMessageSchema)

export const ChangeEdgeInputMessageGuard = deriveGuard(ChangeEdgeInputMessageSchema)
