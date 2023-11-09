import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveInportGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinport']>('removeinport'),
    payload: S.Struct({
      public: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveInportGraphOutputMessageInput = S.InputOf<typeof RemoveInportGraphOutputMessageSchema>

export type RemoveInportGraphOutputMessage = S.OutputOf<typeof RemoveInportGraphOutputMessageSchema>

export const RemoveInportGraphOutputMessageTranscoder = deriveTranscoder(RemoveInportGraphOutputMessageSchema)

export const RemoveInportGraphOutputMessageInputGuard = deriveInputGuard(RemoveInportGraphOutputMessageSchema)

export const RemoveInportGraphOutputMessageGuard = deriveGuard(RemoveInportGraphOutputMessageSchema)
