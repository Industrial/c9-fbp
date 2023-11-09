import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddNodeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addnode']>('addnode'),
    payload: S.Struct({
      id: S.String(),
      component: S.String(),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataNodeSchema),
    }),
  })

export type AddNodeGraphOutputMessageInput = S.InputOf<typeof AddNodeGraphOutputMessageSchema>

export type AddNodeGraphOutputMessage = S.OutputOf<typeof AddNodeGraphOutputMessageSchema>

export const AddNodeGraphOutputMessageTranscoder = deriveTranscoder(AddNodeGraphOutputMessageSchema)

export const AddNodeGraphOutputMessageInputGuard = deriveInputGuard(AddNodeGraphOutputMessageSchema)

export const AddNodeGraphOutputMessageGuard = deriveGuard(AddNodeGraphOutputMessageSchema)
