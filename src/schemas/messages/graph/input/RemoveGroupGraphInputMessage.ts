import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveGroupGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removegroup']>('removegroup'),
    payload: S.Struct({
      name: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveGroupGraphInputMessageInput = S.InputOf<typeof RemoveGroupGraphInputMessageSchema>

export type RemoveGroupGraphInputMessage = S.OutputOf<typeof RemoveGroupGraphInputMessageSchema>

export const RemoveGroupGraphInputMessageTranscoder = deriveTranscoder(RemoveGroupGraphInputMessageSchema)

export const RemoveGroupGraphInputMessageInputGuard = deriveInputGuard(RemoveGroupGraphInputMessageSchema)

export const RemoveGroupGraphInputMessageGuard = deriveGuard(RemoveGroupGraphInputMessageSchema)
