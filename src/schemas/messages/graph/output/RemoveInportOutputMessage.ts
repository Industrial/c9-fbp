import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'

export const RemoveInportOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinport']>('removeinport'),
    payload: S.Struct({
      public: PortSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveInportOutputMessageInput = S.InputOf<typeof RemoveInportOutputMessageSchema>

export type RemoveInportOutputMessage = S.OutputOf<typeof RemoveInportOutputMessageSchema>

export const RemoveInportOutputMessageTranscoder = deriveTranscoder(RemoveInportOutputMessageSchema)

export const RemoveInportOutputMessageInputGuard = deriveInputGuard(RemoveInportOutputMessageSchema)

export const RemoveInportOutputMessageGuard = deriveGuard(RemoveInportOutputMessageSchema)
