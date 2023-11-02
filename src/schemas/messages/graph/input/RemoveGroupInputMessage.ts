import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveGroupInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removegroup']>('removegroup'),
    payload: S.Struct({
      name: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveGroupInputMessageInput = S.InputOf<typeof RemoveGroupInputMessageSchema>

export type RemoveGroupInputMessage = S.OutputOf<typeof RemoveGroupInputMessageSchema>

export const RemoveGroupInputMessageTranscoder = deriveTranscoder(RemoveGroupInputMessageSchema)

export const RemoveGroupInputMessageInputGuard = deriveInputGuard(RemoveGroupInputMessageSchema)

export const RemoveGroupInputMessageGuard = deriveGuard(RemoveGroupInputMessageSchema)
