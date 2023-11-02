import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'

export const RenameOutportOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renameoutport']>('renameoutport'),
    payload: S.Struct({
      from: PortSchema,
      to: PortSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameOutportOutputMessageInput = S.InputOf<typeof RenameOutportOutputMessageSchema>

export type RenameOutportOutputMessage = S.OutputOf<typeof RenameOutportOutputMessageSchema>

export const RenameOutportOutputMessageTranscoder = deriveTranscoder(RenameOutportOutputMessageSchema)

export const RenameOutportOutputMessageInputGuard = deriveInputGuard(RenameOutportOutputMessageSchema)

export const RenameOutportOutputMessageGuard = deriveGuard(RenameOutportOutputMessageSchema)
