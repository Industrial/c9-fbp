import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInportGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addinport']>('addinport'),
    payload: S.Struct({
      public: PortIDSchema,
      node: NodeIDSchema,
      port: PortIDSchema,
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataNodeSchema),
    }),
  })

export type AddInportGraphInputMessageInput = S.InputOf<typeof AddInportGraphInputMessageSchema>

export type AddInportGraphInputMessage = S.OutputOf<typeof AddInportGraphInputMessageSchema>

export const AddInportGraphInputMessageTranscoder = deriveTranscoder(AddInportGraphInputMessageSchema)

export const AddInportGraphInputMessageInputGuard = deriveInputGuard(AddInportGraphInputMessageSchema)

export const AddInportGraphInputMessageGuard = deriveGuard(AddInportGraphInputMessageSchema)
