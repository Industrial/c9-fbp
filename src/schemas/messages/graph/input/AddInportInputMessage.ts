import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const AddInportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addinport']>('addinport'),
    public: PortIDSchema,
    node: NodeIDSchema,
    port: PortIDSchema,
    metadata: MetadataGroupSchema,
    graph: GraphIDSchema,
  })

export type AddInportInputMessageInput = S.InputOf<typeof AddInportInputMessageSchema>

export type AddInportInputMessage = S.OutputOf<typeof AddInportInputMessageSchema>

export const AddInportInputMessageTranscoder = deriveTranscoder(AddInportInputMessageSchema)

export const AddInportInputMessageInputGuard = deriveInputGuard(AddInportInputMessageSchema)

export const AddInportInputMessageGuard = deriveGuard(AddInportInputMessageSchema)
