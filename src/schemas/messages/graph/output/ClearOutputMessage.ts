import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBase, GraphOutputMessageBaseInput } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'

export type ClearOutputMessageInput = GraphOutputMessageBaseInput & {
  command: 'clear'
  payload: {
    id: GraphIDInput
    name: string
    main: boolean
    library?: string
    icon?: string
    description?: string
  }
}

export type ClearOutputMessage = GraphOutputMessageBase & {
  command: 'clear'
  payload: {
    id: GraphID
    name: string
    main: boolean
    library: string | undefined
    icon: string | undefined
    description: string | undefined
  }
}

export const ClearOutputMessageSchema: S.Schema<ClearOutputMessageInput, ClearOutputMessage> =
  GraphInputMessageBaseSchema
    .extend({
      command: S.Literal<['clear']>('clear'),
      payload: S.Struct({
        id: GraphIDSchema,
        name: S.String(),
        main: S.Boolean,
        library: S.Optional(S.String()),
        icon: S.Optional(S.String()),
        description: S.Optional(S.String()),
      }),
    })

export const ClearOutputMessageTranscoder = deriveTranscoder(ClearOutputMessageSchema)
