import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'

export type RenameNodeInputMessageInput = GraphInputMessageBaseInput & {
  command: 'renamenode'
  payload: {
    from: string
    to: string
    graph: GraphIDInput
  }
}

export type RenameNodeInputMessage = GraphInputMessageBase & {
  command: 'renamenode'
  payload: {
    from: string
    to: string
    graph: GraphID
  }
}

export const RenameNodeInputMessageSchema: S.Schema<RenameNodeInputMessageInput, RenameNodeInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['renamenode']>('renamenode'),
      payload: S.Struct({
        from: S.String(),
        to: S.String(),
        graph: GraphIDSchema,
      }),
    })

export const RenameNodeInputMessageTranscoder = deriveTranscoder(RenameNodeInputMessageSchema)
