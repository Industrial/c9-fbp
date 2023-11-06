import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddNodeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addnodeinput']>('addnodeinput'),
    payload: S.Struct({
      id: S.String(),
      component: S.String(),
      metadata: MetadataNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddNodeInputMessageInput = S.InputOf<typeof AddNodeInputMessageSchema>

export type AddNodeInputMessage = S.OutputOf<typeof AddNodeInputMessageSchema>

export const AddNodeInputMessageTranscoder = deriveTranscoder(AddNodeInputMessageSchema)

export const AddNodeInputMessageInputGuard = deriveInputGuard(AddNodeInputMessageSchema)

export const AddNodeInputMessageGuard = deriveGuard(AddNodeInputMessageSchema)
