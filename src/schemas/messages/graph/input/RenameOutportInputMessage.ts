import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'

export const RenameOutportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['renameinport']>('renameinport'),
    payload: S.Struct({
      from: PortSchema,
      to: PortSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameOutportInputMessageInput = S.InputOf<typeof RenameOutportInputMessageSchema>

export type RenameOutportInputMessage = S.OutputOf<typeof RenameOutportInputMessageSchema>

export const RenameOutportInputMessageTranscoder = deriveTranscoder(RenameOutportInputMessageSchema)

export const RenameOutportInputMessageInputGuard = deriveInputGuard(RenameOutportInputMessageSchema)

export const RenameOutportInputMessageGuard = deriveGuard(RenameOutportInputMessageSchema)
