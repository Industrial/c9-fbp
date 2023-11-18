import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'

export const RenameInportGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renameinport']>('renameinport'),
    payload: S.Struct({
      graph: GraphIDSchema,
      node: NodeIDSchema,
      from: PortIDSchema,
      to: PortIDSchema,
    }),
  })

export type RenameInportGraphOutputMessageInput = S.InputOf<typeof RenameInportGraphOutputMessageSchema>

export type RenameInportGraphOutputMessage = S.OutputOf<typeof RenameInportGraphOutputMessageSchema>

export const RenameInportGraphOutputMessageTranscoder = deriveTranscoder(RenameInportGraphOutputMessageSchema)

export const RenameInportGraphOutputMessageInputGuard = deriveInputGuard(RenameInportGraphOutputMessageSchema)

export const RenameInportGraphOutputMessageGuard = deriveGuard(RenameInportGraphOutputMessageSchema)
