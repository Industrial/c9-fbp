import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeNodeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changenode']>('changenode'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type ChangeNodeOutputMessageInput = S.InputOf<typeof ChangeNodeOutputMessageSchema>

export type ChangeNodeOutputMessage = S.OutputOf<typeof ChangeNodeOutputMessageSchema>

export const ChangeNodeOutputMessageTranscoder = deriveTranscoder(ChangeNodeOutputMessageSchema)

export const ChangeNodeOutputMessageInputGuard = deriveInputGuard(ChangeNodeOutputMessageSchema)

export const ChangeNodeOutputMessageGuard = deriveGuard(ChangeNodeOutputMessageSchema)
