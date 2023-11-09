import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'

export const ChangeEdgeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['changeedge']>('changeedge'),
    payload: S.Struct({
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataEdgeSchema),
    }),
  })

export type ChangeEdgeGraphInputMessageInput = S.InputOf<typeof ChangeEdgeGraphInputMessageSchema>

export type ChangeEdgeGraphInputMessage = S.OutputOf<typeof ChangeEdgeGraphInputMessageSchema>

export const ChangeEdgeGraphInputMessageTranscoder = deriveTranscoder(ChangeEdgeGraphInputMessageSchema)

export const ChangeEdgeGraphInputMessageInputGuard = deriveInputGuard(ChangeEdgeGraphInputMessageSchema)

export const ChangeEdgeGraphInputMessageGuard = deriveGuard(ChangeEdgeGraphInputMessageSchema)
