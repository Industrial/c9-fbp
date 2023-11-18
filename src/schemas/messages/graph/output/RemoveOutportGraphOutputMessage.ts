import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'

export const RemoveOutportGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeoutport']>('removeoutport'),
    payload: S.Struct({
      graph: GraphIDSchema,
      // This breaks the spec, but I need it to select a node.
      node: NodeIDSchema,
      public: PortIDSchema,
    }),
  })

export type RemoveOutportGraphOutputMessageInput = S.InputOf<typeof RemoveOutportGraphOutputMessageSchema>

export type RemoveOutportGraphOutputMessage = S.OutputOf<typeof RemoveOutportGraphOutputMessageSchema>

export const RemoveOutportGraphOutputMessageTranscoder = deriveTranscoder(RemoveOutportGraphOutputMessageSchema)

export const RemoveOutportGraphOutputMessageInputGuard = deriveInputGuard(RemoveOutportGraphOutputMessageSchema)

export const RemoveOutportGraphOutputMessageGuard = deriveGuard(RemoveOutportGraphOutputMessageSchema)
