import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeGroupInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['changegroup']>('changegroup'),
    payload: S.Struct({
      name: S.String(),
      metadata: MetadataEdgeSchema,
      graph: GraphIDSchema,
    }),
  })

export type ChangeGroupInputMessageInput = S.InputOf<typeof ChangeGroupInputMessageSchema>

export type ChangeGroupInputMessage = S.OutputOf<typeof ChangeGroupInputMessageSchema>

export const ChangeGroupInputMessageTranscoder = deriveTranscoder(ChangeGroupInputMessageSchema)

export const ChangeGroupInputMessageInputGuard = deriveInputGuard(ChangeGroupInputMessageSchema)

export const ChangeGroupInputMessageGuard = deriveGuard(ChangeGroupInputMessageSchema)
