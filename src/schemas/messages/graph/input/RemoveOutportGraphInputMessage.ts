import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'

export const RemoveOutportGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeoutport']>('removeoutport'),
    payload: S.Struct({
      graph: GraphIDSchema,
      // This breaks the spec, but I need it to select a node.
      node: NodeIDSchema,
      public: PortIDSchema,
    }),
  })

export type RemoveOutportGraphInputMessageInput = S.InputOf<typeof RemoveOutportGraphInputMessageSchema>

export type RemoveOutportGraphInputMessage = S.OutputOf<typeof RemoveOutportGraphInputMessageSchema>

export const RemoveOutportGraphInputMessageTranscoder = deriveTranscoder(RemoveOutportGraphInputMessageSchema)

export const RemoveOutportGraphInputMessageInputGuard = deriveInputGuard(RemoveOutportGraphInputMessageSchema)

export const RemoveOutportGraphInputMessageGuard = deriveGuard(RemoveOutportGraphInputMessageSchema)
