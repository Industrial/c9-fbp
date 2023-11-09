import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameNodeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renamenode']>('renamenode'),
    payload: S.Struct({
      from: NodeIDSchema,
      to: NodeIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameNodeGraphOutputMessageInput = S.InputOf<typeof RenameNodeGraphOutputMessageSchema>

export type RenameNodeGraphOutputMessage = S.OutputOf<typeof RenameNodeGraphOutputMessageSchema>

export const RenameNodeGraphOutputMessageTranscoder = deriveTranscoder(RenameNodeGraphOutputMessageSchema)

export const RenameNodeGraphOutputMessageInputGuard = deriveInputGuard(RenameNodeGraphOutputMessageSchema)

export const RenameNodeGraphOutputMessageGuard = deriveGuard(RenameNodeGraphOutputMessageSchema)
