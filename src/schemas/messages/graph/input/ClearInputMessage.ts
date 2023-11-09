import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ClearInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['clear']>('clear'),
    payload: S.Struct({
      id: GraphIDSchema,
      name: S.Optional(S.String()),
      main: S.Optional(S.Boolean),
      library: S.Optional(S.String()),
      icon: S.Optional(S.String()),
      description: S.Optional(S.String()),
    }),
  })

export type ClearInputMessageInput = S.InputOf<typeof ClearInputMessageSchema>

export type ClearInputMessage = S.OutputOf<typeof ClearInputMessageSchema>

export const ClearInputMessageTranscoder = deriveTranscoder(ClearInputMessageSchema)

export const ClearInputMessageInputGuard = deriveInputGuard(ClearInputMessageSchema)

export const ClearInputMessageGuard = deriveGuard(ClearInputMessageSchema)
