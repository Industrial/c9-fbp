import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ClearOutputMessageSchema = GraphOutputMessageBaseSchema
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

export type ClearOutputMessageInput = S.InputOf<typeof ClearOutputMessageSchema>

export type ClearOutputMessage = S.OutputOf<typeof ClearOutputMessageSchema>

export const ClearOutputMessageTranscoder = deriveTranscoder(ClearOutputMessageSchema)

export const ClearOutputMessageInputGuard = deriveInputGuard(ClearOutputMessageSchema)

export const ClearOutputMessageGuard = deriveGuard(ClearOutputMessageSchema)
