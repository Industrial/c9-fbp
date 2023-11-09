import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'

export const AddGroupInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addgroup']>('addgroup'),
    payload: S.Struct({
      name: S.String(),
      nodes: S.Array(NodeIDSchema),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataGroupSchema),
    }),
  })

export type AddGroupInputMessageInput = S.InputOf<typeof AddGroupInputMessageSchema>

export type AddGroupInputMessage = S.OutputOf<typeof AddGroupInputMessageSchema>

export const AddGroupInputMessageTranscoder = deriveTranscoder(AddGroupInputMessageSchema)

export const AddGroupInputMessageInputGuard = deriveInputGuard(AddGroupInputMessageSchema)

export const AddGroupInputMessageGuard = deriveGuard(AddGroupInputMessageSchema)
