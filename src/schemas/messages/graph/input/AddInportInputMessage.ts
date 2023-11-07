import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addinport']>('addinport'),
    payload: S.Struct({
      public: PortIDSchema,
      node: NodeIDSchema,
      port: PortIDSchema,
      metadata: MetadataNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddInportInputMessageInput = S.InputOf<typeof AddInportInputMessageSchema>

export type AddInportInputMessage = S.OutputOf<typeof AddInportInputMessageSchema>

export const AddInportInputMessageTranscoder = deriveTranscoder(AddInportInputMessageSchema)

export const AddInportInputMessageInputGuard = deriveInputGuard(AddInportInputMessageSchema)

export const AddInportInputMessageGuard = deriveGuard(AddInportInputMessageSchema)
