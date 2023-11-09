import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'

export const RemoveEdgeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeedge']>('removeedge'),
    payload: S.Struct({
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveEdgeGraphInputMessageInput = S.InputOf<typeof RemoveEdgeGraphInputMessageSchema>

export type RemoveEdgeGraphInputMessage = S.OutputOf<typeof RemoveEdgeGraphInputMessageSchema>

export const RemoveEdgeGraphInputMessageTranscoder = deriveTranscoder(RemoveEdgeGraphInputMessageSchema)

export const RemoveEdgeGraphInputMessageInputGuard = deriveInputGuard(RemoveEdgeGraphInputMessageSchema)

export const RemoveEdgeGraphInputMessageGuard = deriveGuard(RemoveEdgeGraphInputMessageSchema)
