import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddEdgeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    payload: S.Struct({
      graph: GraphIDSchema,
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      metadata: S.Optional(MetadataEdgeSchema),
    }),
  })

export type AddEdgeGraphOutputMessageInput = S.InputOf<typeof AddEdgeGraphOutputMessageSchema>

export type AddEdgeGraphOutputMessage = S.OutputOf<typeof AddEdgeGraphOutputMessageSchema>

export const AddEdgeGraphOutputMessageTranscoder = deriveTranscoder(AddEdgeGraphOutputMessageSchema)

export const AddEdgeGraphOutputMessageInputGuard = deriveInputGuard(AddEdgeGraphOutputMessageSchema)

export const AddEdgeGraphOutputMessageGuard = deriveGuard(AddEdgeGraphOutputMessageSchema)
