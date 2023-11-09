import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInportGraphOutputMessageSchema = GraphOutputMessageBaseSchema
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

export type AddInportGraphOutputMessageInput = S.InputOf<typeof AddInportGraphOutputMessageSchema>

export type AddInportGraphOutputMessage = S.OutputOf<typeof AddInportGraphOutputMessageSchema>

export const AddInportGraphOutputMessageTranscoder = deriveTranscoder(AddInportGraphOutputMessageSchema)

export const AddInportGraphOutputMessageInputGuard = deriveInputGuard(AddInportGraphOutputMessageSchema)

export const AddInportGraphOutputMessageGuard = deriveGuard(AddInportGraphOutputMessageSchema)
