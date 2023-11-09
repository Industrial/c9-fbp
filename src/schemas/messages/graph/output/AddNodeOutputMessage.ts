import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddNodeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addnode']>('addnode'),
    payload: S.Struct({
      id: S.String(),
      component: S.String(),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataNodeSchema),
    }),
  })

export type AddNodeOutputMessageInput = S.InputOf<typeof AddNodeOutputMessageSchema>

export type AddNodeOutputMessage = S.OutputOf<typeof AddNodeOutputMessageSchema>

export const AddNodeOutputMessageTranscoder = deriveTranscoder(AddNodeOutputMessageSchema)

export const AddNodeOutputMessageInputGuard = deriveInputGuard(AddNodeOutputMessageSchema)

export const AddNodeOutputMessageGuard = deriveGuard(AddNodeOutputMessageSchema)
