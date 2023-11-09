import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ClearGraphInputMessageSchema = GraphInputMessageBaseSchema
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

export type ClearGraphInputMessageInput = S.InputOf<typeof ClearGraphInputMessageSchema>

export type ClearGraphInputMessage = S.OutputOf<typeof ClearGraphInputMessageSchema>

export const ClearGraphInputMessageTranscoder = deriveTranscoder(ClearGraphInputMessageSchema)

export const ClearGraphInputMessageInputGuard = deriveInputGuard(ClearGraphInputMessageSchema)

export const ClearGraphInputMessageGuard = deriveGuard(ClearGraphInputMessageSchema)
