import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameInportGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renameinport']>('renameinport'),
    payload: S.Struct({
      from: PortIDSchema,
      to: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameInportGraphInputMessageInput = S.InputOf<typeof RenameInportGraphInputMessageSchema>

export type RenameInportGraphInputMessage = S.OutputOf<typeof RenameInportGraphInputMessageSchema>

export const RenameInportGraphInputMessageTranscoder = deriveTranscoder(RenameInportGraphInputMessageSchema)

export const RenameInportGraphInputMessageInputGuard = deriveInputGuard(RenameInportGraphInputMessageSchema)

export const RenameInportGraphInputMessageGuard = deriveGuard(RenameInportGraphInputMessageSchema)
