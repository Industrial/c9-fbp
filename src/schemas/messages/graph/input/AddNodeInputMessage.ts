import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { MetadataNode, MetadataNodeInput, MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'

export type AddNodeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'addnode'
  payload: {
    id: string
    component: string
    metadata: MetadataNodeInput
    graph: GraphIDInput
  }
}

export type AddNodeInputMessage = GraphInputMessageBase & {
  command: 'addnode'
  payload: {
    id: string
    component: string
    metadata: MetadataNode
    graph: GraphID
  }
}

export const AddNodeInputMessageSchema: S.Schema<AddNodeInputMessageInput, AddNodeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['addnode']>('addnode'),
      payload: S.Struct({
        id: S.String(),
        component: S.String(),
        metadata: MetadataNodeSchema,
        graph: GraphIDSchema,
      }),
    })

export const AddNodeInputMessageTranscoder = deriveTranscoder(AddNodeInputMessageSchema)
