import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeGroupGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['changegroup']>('changegroup'),
    payload: S.Struct({
      name: S.String(),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataGroupSchema),
    }),
  })

export type ChangeGroupGraphInputMessageInput = S.InputOf<typeof ChangeGroupGraphInputMessageSchema>

export type ChangeGroupGraphInputMessage = S.OutputOf<typeof ChangeGroupGraphInputMessageSchema>

export const ChangeGroupGraphInputMessageTranscoder = deriveTranscoder(ChangeGroupGraphInputMessageSchema)

export const ChangeGroupGraphInputMessageInputGuard = deriveInputGuard(ChangeGroupGraphInputMessageSchema)

export const ChangeGroupGraphInputMessageGuard = deriveGuard(ChangeGroupGraphInputMessageSchema)
