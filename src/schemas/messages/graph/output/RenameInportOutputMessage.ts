import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RenameInportOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['renameinport']>('renameinport'),
    payload: S.Struct({
      from: PortIDSchema,
      to: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RenameInportOutputMessageInput = S.InputOf<typeof RenameInportOutputMessageSchema>

export type RenameInportOutputMessage = S.OutputOf<typeof RenameInportOutputMessageSchema>

export const RenameInportOutputMessageTranscoder = deriveTranscoder(RenameInportOutputMessageSchema)

export const RenameInportOutputMessageInputGuard = deriveInputGuard(RenameInportOutputMessageSchema)

export const RenameInportOutputMessageGuard = deriveGuard(RenameInportOutputMessageSchema)
