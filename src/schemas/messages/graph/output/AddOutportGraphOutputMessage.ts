import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddOutportGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addoutport']>('addoutport'),
    payload: S.Struct({
      public: PortIDSchema,
      node: NodeIDSchema,
      port: PortIDSchema,
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataNodeSchema),
    }),
  })

export type AddOutportGraphOutputMessageInput = S.InputOf<typeof AddOutportGraphOutputMessageSchema>

export type AddOutportGraphOutputMessage = S.OutputOf<typeof AddOutportGraphOutputMessageSchema>

export const AddOutportGraphOutputMessageTranscoder = deriveTranscoder(AddOutportGraphOutputMessageSchema)

export const AddOutportGraphOutputMessageInputGuard = deriveInputGuard(AddOutportGraphOutputMessageSchema)

export const AddOutportGraphOutputMessageGuard = deriveGuard(AddOutportGraphOutputMessageSchema)
