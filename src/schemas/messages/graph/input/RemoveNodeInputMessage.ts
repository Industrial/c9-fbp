import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveNodeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removenode']>('removenode'),
    payload: S.Struct({
      id: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveNodeInputMessageInput = S.InputOf<typeof RemoveNodeInputMessageSchema>

export type RemoveNodeInputMessage = S.OutputOf<typeof RemoveNodeInputMessageSchema>

export const RemoveNodeInputMessageTranscoder = deriveTranscoder(RemoveNodeInputMessageSchema)

export const RemoveNodeInputMessageInputGuard = deriveInputGuard(RemoveNodeInputMessageSchema)

export const RemoveNodeInputMessageGuard = deriveGuard(RemoveNodeInputMessageSchema)
