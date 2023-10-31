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
import { IIP, IIPInput, IIPSchema } from '#/schemas/messages/shared/IIP.ts'

export type AddInitialInputMessageInput = GraphInputMessageBaseInput & {
  command: 'addinitial'
  payload: {
    src: IIPInput
    tgt: PortInput
    metadata: MetadataEdgeInput
    graph: GraphIDInput
  }
}

export type AddInitialInputMessage = GraphInputMessageBase & {
  command: 'addinitial'
  payload: {
    src: IIP
    tgt: Port
    metadata: MetadataEdge
    graph: GraphID
  }
}

export const AddInitialInputMessageSchema: S.Schema<AddInitialInputMessageInput, AddInitialInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['addinitial']>('addinitial'),
      payload: S.Struct({
        src: IIPSchema,
        tgt: PortSchema,
        metadata: MetadataEdgeSchema,
        graph: GraphIDSchema,
      }),
    })

export const AddInitialInputMessageTranscoder = deriveTranscoder(AddInitialInputMessageSchema)
