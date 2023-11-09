import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ClearGraphOutputMessageSchema = GraphOutputMessageBaseSchema
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

export type ClearGraphOutputMessageInput = S.InputOf<typeof ClearGraphOutputMessageSchema>

export type ClearGraphOutputMessage = S.OutputOf<typeof ClearGraphOutputMessageSchema>

export const ClearGraphOutputMessageTranscoder = deriveTranscoder(ClearGraphOutputMessageSchema)

export const ClearGraphOutputMessageInputGuard = deriveInputGuard(ClearGraphOutputMessageSchema)

export const ClearGraphOutputMessageGuard = deriveGuard(ClearGraphOutputMessageSchema)
