import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveNodeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removenode']>('removenode'),
    payload: S.Struct({
      id: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveNodeGraphInputMessageInput = S.InputOf<typeof RemoveNodeGraphInputMessageSchema>

export type RemoveNodeGraphInputMessage = S.OutputOf<typeof RemoveNodeGraphInputMessageSchema>

export const RemoveNodeGraphInputMessageTranscoder = deriveTranscoder(RemoveNodeGraphInputMessageSchema)

export const RemoveNodeGraphInputMessageInputGuard = deriveInputGuard(RemoveNodeGraphInputMessageSchema)

export const RemoveNodeGraphInputMessageGuard = deriveGuard(RemoveNodeGraphInputMessageSchema)
