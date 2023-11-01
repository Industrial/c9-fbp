import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveGroupOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changegroup']>('changegroup'),
    payload: S.Struct({
      name: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveGroupOutputMessageInput = S.InputOf<typeof RemoveGroupOutputMessageSchema>

export type RemoveGroupOutputMessage = S.OutputOf<typeof RemoveGroupOutputMessageSchema>

export const RemoveGroupOutputMessageTranscoder = deriveTranscoder(RemoveGroupOutputMessageSchema)

export const RemoveGroupOutputMessageInputGuard = deriveInputGuard(RemoveGroupOutputMessageSchema)

export const RemoveGroupOutputMessageGuard = deriveGuard(RemoveGroupOutputMessageSchema)
