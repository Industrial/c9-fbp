import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeNodeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['changenode']>('changenode'),
    payload: S.Struct({
      id: S.String(),
      metadata: MetadataNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type ChangeNodeGraphInputMessageInput = S.InputOf<typeof ChangeNodeGraphInputMessageSchema>

export type ChangeNodeGraphInputMessage = S.OutputOf<typeof ChangeNodeGraphInputMessageSchema>

export const ChangeNodeGraphInputMessageTranscoder = deriveTranscoder(ChangeNodeGraphInputMessageSchema)

export const ChangeNodeGraphInputMessageInputGuard = deriveInputGuard(ChangeNodeGraphInputMessageSchema)

export const ChangeNodeGraphInputMessageGuard = deriveGuard(ChangeNodeGraphInputMessageSchema)
