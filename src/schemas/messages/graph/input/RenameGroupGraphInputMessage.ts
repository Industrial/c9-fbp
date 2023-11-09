import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameGroupGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renamegroup']>('renamegroup'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RenameGroupGraphInputMessageInput = S.InputOf<typeof RenameGroupGraphInputMessageSchema>

export type RenameGroupGraphInputMessage = S.OutputOf<typeof RenameGroupGraphInputMessageSchema>

export const RenameGroupGraphInputMessageTranscoder = deriveTranscoder(RenameGroupGraphInputMessageSchema)

export const RenameGroupGraphInputMessageInputGuard = deriveInputGuard(RenameGroupGraphInputMessageSchema)

export const RenameGroupGraphInputMessageGuard = deriveGuard(RenameGroupGraphInputMessageSchema)
