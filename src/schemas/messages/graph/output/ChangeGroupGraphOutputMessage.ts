import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeGroupGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changegroup']>('changegroup'),
    payload: S.Struct({
      name: S.String(),
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataGroupSchema),
    }),
  })

export type ChangeGroupGraphOutputMessageInput = S.InputOf<typeof ChangeGroupGraphOutputMessageSchema>

export type ChangeGroupGraphOutputMessage = S.OutputOf<typeof ChangeGroupGraphOutputMessageSchema>

export const ChangeGroupGraphOutputMessageTranscoder = deriveTranscoder(ChangeGroupGraphOutputMessageSchema)

export const ChangeGroupGraphOutputMessageInputGuard = deriveInputGuard(ChangeGroupGraphOutputMessageSchema)

export const ChangeGroupGraphOutputMessageGuard = deriveGuard(ChangeGroupGraphOutputMessageSchema)
