import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'

export const AddGroupGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addgroup']>('addgroup'),
    payload: S.Struct({
      name: S.String(),
      nodes: S.Array(NodeIDSchema),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataGroupSchema),
    }),
  })

export type AddGroupGraphOutputMessageInput = S.InputOf<typeof AddGroupGraphOutputMessageSchema>

export type AddGroupGraphOutputMessage = S.OutputOf<typeof AddGroupGraphOutputMessageSchema>

export const AddGroupGraphOutputMessageTranscoder = deriveTranscoder(AddGroupGraphOutputMessageSchema)

export const AddGroupGraphOutputMessageInputGuard = deriveInputGuard(AddGroupGraphOutputMessageSchema)

export const AddGroupGraphOutputMessageGuard = deriveGuard(AddGroupGraphOutputMessageSchema)
