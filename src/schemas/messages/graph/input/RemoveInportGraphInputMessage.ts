import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'

export const RemoveInportGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinport']>('removeinport'),
    payload: S.Struct({
      graph: GraphIDSchema,
      // This breaks the spec, but I need it to select a node.
      node: NodeIDSchema,
      public: PortIDSchema,
    }),
  })

export type RemoveInportGraphInputMessageInput = S.InputOf<typeof RemoveInportGraphInputMessageSchema>

export type RemoveInportGraphInputMessage = S.OutputOf<typeof RemoveInportGraphInputMessageSchema>

export const RemoveInportGraphInputMessageTranscoder = deriveTranscoder(RemoveInportGraphInputMessageSchema)

export const RemoveInportGraphInputMessageInputGuard = deriveInputGuard(RemoveInportGraphInputMessageSchema)

export const RemoveInportGraphInputMessageGuard = deriveGuard(RemoveInportGraphInputMessageSchema)
