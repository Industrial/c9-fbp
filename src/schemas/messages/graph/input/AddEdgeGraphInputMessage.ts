import * as S from 'schemata-ts'
import { EdgeSchema } from '#/schemas/messages/shared/Edge.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddEdgeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    payload: EdgeSchema.intersect(S.Struct({
      graph: GraphIDSchema,
    })),
  })

export type AddEdgeGraphInputMessageInput = S.InputOf<typeof AddEdgeGraphInputMessageSchema>

export type AddEdgeGraphInputMessage = S.OutputOf<typeof AddEdgeGraphInputMessageSchema>

export const AddEdgeGraphInputMessageTranscoder = deriveTranscoder(AddEdgeGraphInputMessageSchema)

export const AddEdgeGraphInputMessageInputGuard = deriveInputGuard(AddEdgeGraphInputMessageSchema)

export const AddEdgeGraphInputMessageGuard = deriveGuard(AddEdgeGraphInputMessageSchema)
