import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'

export const RemoveEdgeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeedge']>('removeedge'),
    payload: S.Struct({
      src: TargetNodeSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveEdgeInputMessageInput = S.InputOf<typeof RemoveEdgeInputMessageSchema>

export type RemoveEdgeInputMessage = S.OutputOf<typeof RemoveEdgeInputMessageSchema>

export const RemoveEdgeInputMessageTranscoder = deriveTranscoder(RemoveEdgeInputMessageSchema)

export const RemoveEdgeInputMessageInputGuard = deriveInputGuard(RemoveEdgeInputMessageSchema)

export const RemoveEdgeInputMessageGuard = deriveGuard(RemoveEdgeInputMessageSchema)
