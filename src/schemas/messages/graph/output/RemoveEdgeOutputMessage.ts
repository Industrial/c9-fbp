import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveEdgeOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeedge']>('removeedge'),
    payload: S.Struct({
      src: PortSchema,
      tgt: PortSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveEdgeOutputMessageInput = S.InputOf<typeof RemoveEdgeOutputMessageSchema>

export type RemoveEdgeOutputMessage = S.OutputOf<typeof RemoveEdgeOutputMessageSchema>

export const RemoveEdgeOutputMessageTranscoder = deriveTranscoder(RemoveEdgeOutputMessageSchema)

export const RemoveEdgeOutputMessageInputGuard = deriveInputGuard(RemoveEdgeOutputMessageSchema)

export const RemoveEdgeOutputMessageGuard = deriveGuard(RemoveEdgeOutputMessageSchema)
