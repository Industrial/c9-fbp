import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameInportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renameinport']>('renameinport'),
    payload: S.Struct({
      from: PortIDSchema,
      to: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameInportInputMessageInput = S.InputOf<typeof RenameInportInputMessageSchema>

export type RenameInportInputMessage = S.OutputOf<typeof RenameInportInputMessageSchema>

export const RenameInportInputMessageTranscoder = deriveTranscoder(RenameInportInputMessageSchema)

export const RenameInportInputMessageInputGuard = deriveInputGuard(RenameInportInputMessageSchema)

export const RenameInportInputMessageGuard = deriveGuard(RenameInportInputMessageSchema)
