import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameNodeGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renamenode']>('renamenode'),
    payload: S.Struct({
      from: NodeIDSchema,
      to: NodeIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameNodeGraphInputMessageInput = S.InputOf<typeof RenameNodeGraphInputMessageSchema>

export type RenameNodeGraphInputMessage = S.OutputOf<typeof RenameNodeGraphInputMessageSchema>

export const RenameNodeGraphInputMessageTranscoder = deriveTranscoder(RenameNodeGraphInputMessageSchema)

export const RenameNodeGraphInputMessageInputGuard = deriveInputGuard(RenameNodeGraphInputMessageSchema)

export const RenameNodeGraphInputMessageGuard = deriveGuard(RenameNodeGraphInputMessageSchema)
