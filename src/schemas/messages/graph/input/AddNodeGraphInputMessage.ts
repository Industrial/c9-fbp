import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddNodeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addnode']>('addnode'),
    payload: S.Struct({
      id: S.String(),
      component: S.String(),
      graph: S.Optional(GraphIDSchema),
      metadata: S.Optional(MetadataNodeSchema),
    }),
  })

export type AddNodeGraphInputMessageInput = S.InputOf<typeof AddNodeGraphInputMessageSchema>

export type AddNodeGraphInputMessage = S.OutputOf<typeof AddNodeGraphInputMessageSchema>

export const AddNodeGraphInputMessageTranscoder = deriveTranscoder(AddNodeGraphInputMessageSchema)

export const AddNodeGraphInputMessageInputGuard = deriveInputGuard(AddNodeGraphInputMessageSchema)

export const AddNodeGraphInputMessageGuard = deriveGuard(AddNodeGraphInputMessageSchema)
