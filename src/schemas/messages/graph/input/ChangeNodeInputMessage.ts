import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeNodeInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['changenode']>('changenode'),
    payload: S.Struct({
      from: S.String(),
      to: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type ChangeNodeInputMessageInput = S.InputOf<typeof ChangeNodeInputMessageSchema>

export type ChangeNodeInputMessage = S.OutputOf<typeof ChangeNodeInputMessageSchema>

export const ChangeNodeInputMessageTranscoder = deriveTranscoder(ChangeNodeInputMessageSchema)

export const ChangeNodeInputMessageInputGuard = deriveInputGuard(ChangeNodeInputMessageSchema)

export const ChangeNodeInputMessageGuard = deriveGuard(ChangeNodeInputMessageSchema)
