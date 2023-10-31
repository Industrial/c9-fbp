import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphOutputMessageBase,
  GraphOutputMessageBaseInput,
  GraphOutputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { Edge, EdgeInput, EdgeSchema } from '#/schemas/messages/shared/Edge.ts'

// export type AddEdgeOutputMessageInput = GraphOutputMessageBaseInput & {
//   command: 'addedge'
//   payload: EdgeInput & {
//     graph: GraphIDInput
//   }
// }

// export type AddEdgeOutputMessage = GraphOutputMessageBase & {
//   command: 'addedge'
//   payload: Edge & {
//     graph: GraphID
//   }
// }

export const AddEdgeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    payload: EdgeSchema.intersect(S.Struct({
      graph: GraphIDSchema,
    })),
  })

export type AddEdgeOutputMessageInput = S.InputOf<typeof AddEdgeOutputMessageSchema>

export type AddEdgeOutputMessage = S.OutputOf<typeof AddEdgeOutputMessageSchema>

export const AddEdgeOutputMessageTranscoder = deriveTranscoder(AddEdgeOutputMessageSchema)
