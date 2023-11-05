import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveOutportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeoutport']>('removeoutport'),
    payload: S.Struct({
      public: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveOutportInputMessageInput = S.InputOf<typeof RemoveOutportInputMessageSchema>

export type RemoveOutportInputMessage = S.OutputOf<typeof RemoveOutportInputMessageSchema>

export const RemoveOutportInputMessageTranscoder = deriveTranscoder(RemoveOutportInputMessageSchema)

export const RemoveOutportInputMessageInputGuard = deriveInputGuard(RemoveOutportInputMessageSchema)

export const RemoveOutportInputMessageGuard = deriveGuard(RemoveOutportInputMessageSchema)
