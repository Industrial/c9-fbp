import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameNodeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renamenode']>('renamenode'),
    payload: S.Struct({
      from: NodeIDSchema,
      to: NodeIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameNodeOutputMessageInput = S.InputOf<typeof RenameNodeOutputMessageSchema>

export type RenameNodeOutputMessage = S.OutputOf<typeof RenameNodeOutputMessageSchema>

export const RenameNodeOutputMessageTranscoder = deriveTranscoder(RenameNodeOutputMessageSchema)

export const RenameNodeOutputMessageInputGuard = deriveInputGuard(RenameNodeOutputMessageSchema)

export const RenameNodeOutputMessageGuard = deriveGuard(RenameNodeOutputMessageSchema)
