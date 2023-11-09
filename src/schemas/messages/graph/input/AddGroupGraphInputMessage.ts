import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'

export const AddGroupGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addgroup']>('addgroup'),
    payload: S.Struct({
      name: S.String(),
      nodes: S.Array(NodeIDSchema),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataGroupSchema),
    }),
  })

export type AddGroupGraphInputMessageInput = S.InputOf<typeof AddGroupGraphInputMessageSchema>

export type AddGroupGraphInputMessage = S.OutputOf<typeof AddGroupGraphInputMessageSchema>

export const AddGroupGraphInputMessageTranscoder = deriveTranscoder(AddGroupGraphInputMessageSchema)

export const AddGroupGraphInputMessageInputGuard = deriveInputGuard(AddGroupGraphInputMessageSchema)

export const AddGroupGraphInputMessageGuard = deriveGuard(AddGroupGraphInputMessageSchema)
