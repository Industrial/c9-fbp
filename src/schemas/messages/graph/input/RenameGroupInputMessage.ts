import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameGroupInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renamegroup']>('renamegroup'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RenameGroupInputMessageInput = S.InputOf<typeof RenameGroupInputMessageSchema>

export type RenameGroupInputMessage = S.OutputOf<typeof RenameGroupInputMessageSchema>

export const RenameGroupInputMessageTranscoder = deriveTranscoder(RenameGroupInputMessageSchema)

export const RenameGroupInputMessageInputGuard = deriveInputGuard(RenameGroupInputMessageSchema)

export const RenameGroupInputMessageGuard = deriveGuard(RenameGroupInputMessageSchema)
