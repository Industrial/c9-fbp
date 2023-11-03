import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeGroupOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changegroup']>('changegroup'),
    payload: S.Struct({
      name: S.String(),
      metadata: MetadataGroupSchema,
      graph: GraphIDSchema,
    }),
  })

export type ChangeGroupOutputMessageInput = S.InputOf<typeof ChangeGroupOutputMessageSchema>

export type ChangeGroupOutputMessage = S.OutputOf<typeof ChangeGroupOutputMessageSchema>

export const ChangeGroupOutputMessageTranscoder = deriveTranscoder(ChangeGroupOutputMessageSchema)

export const ChangeGroupOutputMessageInputGuard = deriveInputGuard(ChangeGroupOutputMessageSchema)

export const ChangeGroupOutputMessageGuard = deriveGuard(ChangeGroupOutputMessageSchema)
