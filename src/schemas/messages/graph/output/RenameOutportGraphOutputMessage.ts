import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameOutportGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renameoutport']>('renameoutport'),
    payload: S.Struct({
      graph: GraphIDSchema,
      node: NodeIDSchema,
      from: PortIDSchema,
      to: PortIDSchema,
    }),
  })

export type RenameOutportGraphOutputMessageInput = S.InputOf<typeof RenameOutportGraphOutputMessageSchema>

export type RenameOutportGraphOutputMessage = S.OutputOf<typeof RenameOutportGraphOutputMessageSchema>

export const RenameOutportGraphOutputMessageTranscoder = deriveTranscoder(RenameOutportGraphOutputMessageSchema)

export const RenameOutportGraphOutputMessageInputGuard = deriveInputGuard(RenameOutportGraphOutputMessageSchema)

export const RenameOutportGraphOutputMessageGuard = deriveGuard(RenameOutportGraphOutputMessageSchema)
