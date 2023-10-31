import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { Port, PortInput, PortSchema } from '#/schemas/messages/shared/Port.ts'
import { MetadataEdge, MetadataEdgeInput, MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'

export type ChangeEdgeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'changeedge'
  payload: {
    src: PortInput
    tgt: PortInput
    metadata: MetadataEdgeInput
    graph: GraphIDInput
  }
}

export type ChangeEdgeInputMessage = GraphInputMessageBase & {
  command: 'changeedge'
  payload: {
    src: Port
    tgt: Port
    metadata: MetadataEdge
    graph: GraphID
  }
}

export const ChangeEdgeInputMessageSchema: S.Schema<ChangeEdgeInputMessageInput, ChangeEdgeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['changeedge']>('changeedge'),
      payload: S.Struct({
        src: PortSchema,
        tgt: PortSchema,
        metadata: MetadataEdgeSchema,
        graph: GraphIDSchema,
      }),
    })

export const ChangeEdgeInputMessageTranscoder = deriveTranscoder(ChangeEdgeInputMessageSchema)
