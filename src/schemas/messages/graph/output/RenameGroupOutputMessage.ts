import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameGroupOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renamegroup']>('renamegroup'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RenameGroupOutputMessageInput = S.InputOf<typeof RenameGroupOutputMessageSchema>

export type RenameGroupOutputMessage = S.OutputOf<typeof RenameGroupOutputMessageSchema>

export const RenameGroupOutputMessageTranscoder = deriveTranscoder(RenameGroupOutputMessageSchema)

export const RenameGroupOutputMessageInputGuard = deriveInputGuard(RenameGroupOutputMessageSchema)

export const RenameGroupOutputMessageGuard = deriveGuard(RenameGroupOutputMessageSchema)
