import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'

export const ChangeEdgeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changeedge']>('changeedge'),
    payload: S.Struct({
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataEdgeSchema),
    }),
  })

export type ChangeEdgeGraphOutputMessageInput = S.InputOf<typeof ChangeEdgeGraphOutputMessageSchema>

export type ChangeEdgeGraphOutputMessage = S.OutputOf<typeof ChangeEdgeGraphOutputMessageSchema>

export const ChangeEdgeGraphOutputMessageTranscoder = deriveTranscoder(ChangeEdgeGraphOutputMessageSchema)

export const ChangeEdgeGraphOutputMessageInputGuard = deriveInputGuard(ChangeEdgeGraphOutputMessageSchema)

export const ChangeEdgeGraphOutputMessageGuard = deriveGuard(ChangeEdgeGraphOutputMessageSchema)
