import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddOutportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addoutport']>('addoutport'),
    payload: S.Struct({
      public: PortIDSchema,
      node: NodeIDSchema,
      port: PortIDSchema,
      metadata: MetadataNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddOutportInputMessageInput = S.InputOf<typeof AddOutportInputMessageSchema>

export type AddOutportInputMessage = S.OutputOf<typeof AddOutportInputMessageSchema>

export const AddOutportInputMessageTranscoder = deriveTranscoder(AddOutportInputMessageSchema)

export const AddOutportInputMessageInputGuard = deriveInputGuard(AddOutportInputMessageSchema)

export const AddOutportInputMessageGuard = deriveGuard(AddOutportInputMessageSchema)
