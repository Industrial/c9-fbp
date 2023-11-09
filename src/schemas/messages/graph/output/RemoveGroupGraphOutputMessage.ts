import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveGroupGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removegroup']>('removegroup'),
    payload: S.Struct({
      name: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveGroupGraphOutputMessageInput = S.InputOf<typeof RemoveGroupGraphOutputMessageSchema>

export type RemoveGroupGraphOutputMessage = S.OutputOf<typeof RemoveGroupGraphOutputMessageSchema>

export const RemoveGroupGraphOutputMessageTranscoder = deriveTranscoder(RemoveGroupGraphOutputMessageSchema)

export const RemoveGroupGraphOutputMessageInputGuard = deriveInputGuard(RemoveGroupGraphOutputMessageSchema)

export const RemoveGroupGraphOutputMessageGuard = deriveGuard(RemoveGroupGraphOutputMessageSchema)
