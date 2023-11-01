import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveNodeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removenode']>('removenode'),
    payload: S.Struct({
      id: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveNodeOutputMessageInput = S.InputOf<typeof RemoveNodeOutputMessageSchema>

export type RemoveNodeOutputMessage = S.OutputOf<typeof RemoveNodeOutputMessageSchema>

export const RemoveNodeOutputMessageTranscoder = deriveTranscoder(RemoveNodeOutputMessageSchema)

export const RemoveNodeOutputMessageInputGuard = deriveInputGuard(RemoveNodeOutputMessageSchema)

export const RemoveNodeOutputMessageGuard = deriveGuard(RemoveNodeOutputMessageSchema)
