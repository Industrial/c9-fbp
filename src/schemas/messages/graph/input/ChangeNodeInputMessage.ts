import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'

export type ChangeNodeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'changenode'
  payload: {
    from: string
    to: string
    graph: GraphIDInput
  }
}

export type ChangeNodeInputMessage = GraphInputMessageBase & {
  command: 'changenode'
  payload: {
    from: string
    to: string
    graph: GraphID
  }
}

export const ChangeNodeInputMessageSchema: S.Schema<ChangeNodeInputMessageInput, ChangeNodeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['changenode']>('changenode'),
      payload: S.Struct({
        from: S.String(),
        to: S.String(),
        graph: GraphIDSchema,
      }),
    })

export const ChangeNodeInputMessageTranscoder = deriveTranscoder(ChangeNodeInputMessageSchema)
