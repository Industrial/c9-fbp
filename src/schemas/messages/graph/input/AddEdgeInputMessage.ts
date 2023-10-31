import * as S from 'schemata-ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataEdge, MetadataEdgeInput, MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { Port, PortInput, PortSchema } from '#/schemas/messages/shared/Port.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type AddEdgeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'addedge'
  payload: {
    src: PortInput
    tgt: PortInput
    metadata: MetadataEdgeInput
    graph: GraphIDInput
  }
}

export type AddEdgeInputMessage = GraphInputMessageBase & {
  command: 'addedge'
  payload: {
    src: Port
    tgt: Port
    metadata: MetadataEdge
    graph: GraphID
  }
}

export const AddEdgeInputMessageSchema: S.Schema<AddEdgeInputMessageInput, AddEdgeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['addedge']>('addedge'),
      payload: S.Struct({
        src: PortSchema,
        tgt: PortSchema,
        metadata: MetadataEdgeSchema,
        graph: GraphIDSchema,
      }),
    })

export const AddEdgeInputMessageTranscoder = deriveTranscoder(AddEdgeInputMessageSchema)

export const AddEdgeInputMessageInputGuard = deriveInputGuard(AddEdgeInputMessageSchema)

export const AddEdgeInputMessageGuard = deriveGuard(AddEdgeInputMessageSchema)
