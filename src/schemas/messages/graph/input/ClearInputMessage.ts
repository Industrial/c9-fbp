import * as S from 'schemata-ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import {
  GraphInputMessageBase,
  GraphInputMessageBaseInput,
  GraphInputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type ClearInputMessageInput = GraphInputMessageBaseInput & {
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

export type ClearInputMessage = GraphInputMessageBase & {
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

export const ClearInputMessageSchema: S.Schema<ClearInputMessageInput, ClearInputMessage> = GraphInputMessageBaseSchema
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

export const ClearInputMessageTranscoder = deriveTranscoder(ClearInputMessageSchema)

export const ClearInputMessageInputGuard = deriveInputGuard(ClearInputMessageSchema)

export const ClearInputMessageGuard = deriveGuard(ClearInputMessageSchema)
