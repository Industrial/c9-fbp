import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveEdgeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeedge']>('removeedge'),
    payload: S.Struct({
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveEdgeGraphOutputMessageInput = S.InputOf<typeof RemoveEdgeGraphOutputMessageSchema>

export type RemoveEdgeGraphOutputMessage = S.OutputOf<typeof RemoveEdgeGraphOutputMessageSchema>

export const RemoveEdgeGraphOutputMessageTranscoder = deriveTranscoder(RemoveEdgeGraphOutputMessageSchema)

export const RemoveEdgeGraphOutputMessageInputGuard = deriveInputGuard(RemoveEdgeGraphOutputMessageSchema)

export const RemoveEdgeGraphOutputMessageGuard = deriveGuard(RemoveEdgeGraphOutputMessageSchema)
