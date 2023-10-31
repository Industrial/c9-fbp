import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { Port, PortInput, PortSchema } from '#/schemas/messages/shared/Port.ts'
import { IIP, IIPInput, IIPSchema } from '#/schemas/messages/shared/IIP.ts'

export type RemoveInitialInputMessageInput = GraphInputMessageBaseInput & {
  command: 'removeinitial'
  payload: {
    src: IIPInput
    tgt: PortInput
    graph: GraphIDInput
  }
}

export type RemoveInitialInputMessage = GraphInputMessageBase & {
  command: 'removeinitial'
  payload: {
    src: IIP
    tgt: Port
    graph: GraphID
  }
}

export const RemoveInitialInputMessageSchema: S.Schema<RemoveInitialInputMessageInput, RemoveInitialInputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['removeinitial']>('removeinitial'),
      payload: S.Struct({
        src: IIPSchema,
        tgt: PortSchema,
        graph: GraphIDSchema,
      }),
    })

export const RemoveInitialInputMessageTranscoder = deriveTranscoder(RemoveInitialInputMessageSchema)
