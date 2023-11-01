import * as S from 'schemata-ts'
import { EdgeSchema } from '#/schemas/messages/shared/Edge.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddEdgeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    payload: EdgeSchema.intersect(S.Struct({
      graph: GraphIDSchema,
    })),
  })

export type AddEdgeInputMessageInput = S.InputOf<typeof AddEdgeInputMessageSchema>

export type AddEdgeInputMessage = S.OutputOf<typeof AddEdgeInputMessageSchema>

export const AddEdgeInputMessageTranscoder = deriveTranscoder(AddEdgeInputMessageSchema)

export const AddEdgeInputMessageInputGuard = deriveInputGuard(AddEdgeInputMessageSchema)

export const AddEdgeInputMessageGuard = deriveGuard(AddEdgeInputMessageSchema)
