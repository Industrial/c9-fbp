import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveEdgeInputMessageSchema = GraphInputMessageBaseSchema
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

export type RemoveEdgeInputMessageInput = S.InputOf<typeof RemoveEdgeInputMessageSchema>

export type RemoveEdgeInputMessage = S.OutputOf<typeof RemoveEdgeInputMessageSchema>

export const RemoveEdgeInputMessageTranscoder = deriveTranscoder(RemoveEdgeInputMessageSchema)

export const RemoveEdgeInputMessageInputGuard = deriveInputGuard(RemoveEdgeInputMessageSchema)

export const RemoveEdgeInputMessageGuard = deriveGuard(RemoveEdgeInputMessageSchema)
