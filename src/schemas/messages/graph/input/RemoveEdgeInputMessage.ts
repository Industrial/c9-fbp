import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { Port, PortInput, PortSchema } from '#/schemas/messages/shared/Port.ts'

export type RemoveEdgeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'removeedge'
  payload: {
    src: PortInput
    tgt: PortInput
    graph: GraphIDInput
  }
}

export type RemoveEdgeInputMessage = GraphInputMessageBase & {
  command: 'removeedge'
  payload: {
    src: Port
    tgt: Port
    graph: GraphID
  }
}

export const RemoveEdgeInputMessageSchema: S.Schema<RemoveEdgeInputMessageInput, RemoveEdgeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['removeedge']>('removeedge'),
      payload: S.Struct({
        src: PortSchema,
        tgt: PortSchema,
        graph: GraphIDSchema,
      }),
    })

export const RemoveEdgeInputMessageTranscoder = deriveTranscoder(RemoveEdgeInputMessageSchema)
