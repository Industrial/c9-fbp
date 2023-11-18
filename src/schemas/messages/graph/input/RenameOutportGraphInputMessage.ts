import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameOutportGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renameoutport']>('renameoutport'),
    payload: S.Struct({
      graph: GraphIDSchema,
      node: NodeIDSchema,
      from: PortIDSchema,
      to: PortIDSchema,
    }),
  })

export type RenameOutportGraphInputMessageInput = S.InputOf<typeof RenameOutportGraphInputMessageSchema>

export type RenameOutportGraphInputMessage = S.OutputOf<typeof RenameOutportGraphInputMessageSchema>

export const RenameOutportGraphInputMessageTranscoder = deriveTranscoder(RenameOutportGraphInputMessageSchema)

export const RenameOutportGraphInputMessageInputGuard = deriveInputGuard(RenameOutportGraphInputMessageSchema)

export const RenameOutportGraphInputMessageGuard = deriveGuard(RenameOutportGraphInputMessageSchema)
