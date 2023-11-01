import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameNodeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renamenode']>('renamenode'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RenameNodeInputMessageInput = S.InputOf<typeof RenameNodeInputMessageSchema>

export type RenameNodeInputMessage = S.OutputOf<typeof RenameNodeInputMessageSchema>

export const RenameNodeInputMessageTranscoder = deriveTranscoder(RenameNodeInputMessageSchema)

export const RenameNodeInputMessageInputGuard = deriveInputGuard(RenameNodeInputMessageSchema)

export const RenameNodeInputMessageGuard = deriveGuard(RenameNodeInputMessageSchema)
