import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'

export const AddGroupOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addedge']>('addedge'),
    name: S.String(),
    nodes: S.Array(NodeIDSchema),
    metadata: MetadataGroupSchema,
    graph: GraphIDSchema,
  })

export type AddGroupOutputMessageInput = S.InputOf<typeof AddGroupOutputMessageSchema>

export type AddGroupOutputMessage = S.OutputOf<typeof AddGroupOutputMessageSchema>

export const AddGroupOutputMessageTranscoder = deriveTranscoder(AddGroupOutputMessageSchema)

export const AddGroupOutputMessageInputGuard = deriveInputGuard(AddGroupOutputMessageSchema)

export const AddGroupOutputMessageGuard = deriveGuard(AddGroupOutputMessageSchema)
