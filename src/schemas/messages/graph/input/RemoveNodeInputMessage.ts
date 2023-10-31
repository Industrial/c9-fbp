import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'

export type RemoveNodeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'removenode'
  payload: {
    id: string
    graph: GraphIDInput
  }
}

export type RemoveNodeInputMessage = GraphInputMessageBase & {
  command: 'removenode'
  payload: {
    id: string
    graph: GraphID
  }
}

export const RemoveNodeInputMessageSchema: S.Schema<RemoveNodeInputMessageInput, RemoveNodeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['removenode']>('removenode'),
      payload: S.Struct({
        id: S.String(),
        graph: GraphIDSchema,
      }),
    })

export const RemoveNodeInputMessageTranscoder = deriveTranscoder(RemoveNodeInputMessageSchema)
