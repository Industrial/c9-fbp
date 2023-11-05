import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveOutportOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeoutport']>('removeoutport'),
    payload: S.Struct({
      public: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveOutportOutputMessageInput = S.InputOf<typeof RemoveOutportOutputMessageSchema>

export type RemoveOutportOutputMessage = S.OutputOf<typeof RemoveOutportOutputMessageSchema>

export const RemoveOutportOutputMessageTranscoder = deriveTranscoder(RemoveOutportOutputMessageSchema)

export const RemoveOutportOutputMessageInputGuard = deriveInputGuard(RemoveOutportOutputMessageSchema)

export const RemoveOutportOutputMessageGuard = deriveGuard(RemoveOutportOutputMessageSchema)
