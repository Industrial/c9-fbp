import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkInputMessageBaseSchema } from '#/schemas/messages/network/NetworkInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const StopNetworkInputMessageSchema = NetworkInputMessageBaseSchema
  .extend({
    command: S.Literal<['stop']>('stop'),
    payload: S.Struct({
      graph: GraphIDSchema,
    }),
  })

export type StopNetworkInputMessageInput = S.InputOf<typeof StopNetworkInputMessageSchema>

export type StopNetworkInputMessage = S.OutputOf<typeof StopNetworkInputMessageSchema>

export const StopNetworkInputMessageTranscoder = deriveTranscoder(StopNetworkInputMessageSchema)

export const StopNetworkInputMessageInputGuard = deriveInputGuard(StopNetworkInputMessageSchema)

export const StopNetworkInputMessageGuard = deriveGuard(StopNetworkInputMessageSchema)
