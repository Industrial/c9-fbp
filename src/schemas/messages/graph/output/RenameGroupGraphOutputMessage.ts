import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameGroupGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renamegroup']>('renamegroup'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RenameGroupGraphOutputMessageInput = S.InputOf<typeof RenameGroupGraphOutputMessageSchema>

export type RenameGroupGraphOutputMessage = S.OutputOf<typeof RenameGroupGraphOutputMessageSchema>

export const RenameGroupGraphOutputMessageTranscoder = deriveTranscoder(RenameGroupGraphOutputMessageSchema)

export const RenameGroupGraphOutputMessageInputGuard = deriveInputGuard(RenameGroupGraphOutputMessageSchema)

export const RenameGroupGraphOutputMessageGuard = deriveGuard(RenameGroupGraphOutputMessageSchema)
