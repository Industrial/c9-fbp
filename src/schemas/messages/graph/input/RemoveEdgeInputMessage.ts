import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveEdgeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeedge']>('removeedge'),
    payload: S.Struct({
      src: PortSchema,
      tgt: PortSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveEdgeInputMessageInput = S.InputOf<typeof RemoveEdgeInputMessageSchema>

export type RemoveEdgeInputMessage = S.OutputOf<typeof RemoveEdgeInputMessageSchema>

export const RemoveEdgeInputMessageTranscoder = deriveTranscoder(RemoveEdgeInputMessageSchema)

export const RemoveEdgeInputMessageInputGuard = deriveInputGuard(RemoveEdgeInputMessageSchema)

export const RemoveEdgeInputMessageGuard = deriveGuard(RemoveEdgeInputMessageSchema)
