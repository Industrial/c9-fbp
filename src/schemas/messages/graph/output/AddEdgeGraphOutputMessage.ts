import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { EdgeSchema } from '#/schemas/messages/shared/Edge.ts'

export const AddEdgeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    payload: EdgeSchema.intersect(S.Struct({
      graph: GraphIDSchema,
    })),
  })

export type AddEdgeGraphOutputMessageInput = S.InputOf<typeof AddEdgeGraphOutputMessageSchema>

export type AddEdgeGraphOutputMessage = S.OutputOf<typeof AddEdgeGraphOutputMessageSchema>

export const AddEdgeGraphOutputMessageTranscoder = deriveTranscoder(AddEdgeGraphOutputMessageSchema)
