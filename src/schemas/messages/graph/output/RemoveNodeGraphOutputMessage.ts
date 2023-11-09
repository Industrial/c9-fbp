import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveNodeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removenode']>('removenode'),
    payload: S.Struct({
      id: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type RemoveNodeGraphOutputMessageInput = S.InputOf<typeof RemoveNodeGraphOutputMessageSchema>

export type RemoveNodeGraphOutputMessage = S.OutputOf<typeof RemoveNodeGraphOutputMessageSchema>

export const RemoveNodeGraphOutputMessageTranscoder = deriveTranscoder(RemoveNodeGraphOutputMessageSchema)

export const RemoveNodeGraphOutputMessageInputGuard = deriveInputGuard(RemoveNodeGraphOutputMessageSchema)

export const RemoveNodeGraphOutputMessageGuard = deriveGuard(RemoveNodeGraphOutputMessageSchema)
