import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddOutportGraphInputMessageSchema = GraphInputMessageBaseSchema
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

export type AddOutportGraphInputMessageInput = S.InputOf<typeof AddOutportGraphInputMessageSchema>

export type AddOutportGraphInputMessage = S.OutputOf<typeof AddOutportGraphInputMessageSchema>

export const AddOutportGraphInputMessageTranscoder = deriveTranscoder(AddOutportGraphInputMessageSchema)

export const AddOutportGraphInputMessageInputGuard = deriveInputGuard(AddOutportGraphInputMessageSchema)

export const AddOutportGraphInputMessageGuard = deriveGuard(AddOutportGraphInputMessageSchema)
