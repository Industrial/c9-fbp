import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const RemoveInportInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinport']>('removeinport'),
    payload: S.Struct({
      public: PortIDSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveInportInputMessageInput = S.InputOf<typeof RemoveInportInputMessageSchema>

export type RemoveInportInputMessage = S.OutputOf<typeof RemoveInportInputMessageSchema>

export const RemoveInportInputMessageTranscoder = deriveTranscoder(RemoveInportInputMessageSchema)

export const RemoveInportInputMessageInputGuard = deriveInputGuard(RemoveInportInputMessageSchema)

export const RemoveInportInputMessageGuard = deriveGuard(RemoveInportInputMessageSchema)
