import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveOutportGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeoutport']>('removeoutport'),
    payload: S.Struct({
      public: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveOutportGraphInputMessageInput = S.InputOf<typeof RemoveOutportGraphInputMessageSchema>

export type RemoveOutportGraphInputMessage = S.OutputOf<typeof RemoveOutportGraphInputMessageSchema>

export const RemoveOutportGraphInputMessageTranscoder = deriveTranscoder(RemoveOutportGraphInputMessageSchema)

export const RemoveOutportGraphInputMessageInputGuard = deriveInputGuard(RemoveOutportGraphInputMessageSchema)

export const RemoveOutportGraphInputMessageGuard = deriveGuard(RemoveOutportGraphInputMessageSchema)
