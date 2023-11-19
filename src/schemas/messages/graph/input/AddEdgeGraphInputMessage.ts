import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddEdgeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    payload: S.Struct({
      graph: GraphIDSchema,
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      metadata: S.Optional(MetadataEdgeSchema),
    }),
  })

export type AddEdgeGraphInputMessageInput = S.InputOf<typeof AddEdgeGraphInputMessageSchema>

export type AddEdgeGraphInputMessage = S.OutputOf<typeof AddEdgeGraphInputMessageSchema>

export const AddEdgeGraphInputMessageTranscoder = deriveTranscoder(AddEdgeGraphInputMessageSchema)

export const AddEdgeGraphInputMessageInputGuard = deriveInputGuard(AddEdgeGraphInputMessageSchema)

export const AddEdgeGraphInputMessageGuard = deriveGuard(AddEdgeGraphInputMessageSchema)
