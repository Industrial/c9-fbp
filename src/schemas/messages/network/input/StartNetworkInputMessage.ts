import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkInputMessageBaseSchema } from '#/schemas/messages/network/NetworkInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const StartNetworkInputMessageSchema = NetworkInputMessageBaseSchema
  .extend({
    command: S.Literal<['start']>('start'),
    payload: S.Struct({
      graph: GraphIDSchema,
    }),
  })

export type StartNetworkInputMessageInput = S.InputOf<typeof StartNetworkInputMessageSchema>

export type StartNetworkInputMessage = S.OutputOf<typeof StartNetworkInputMessageSchema>

export const StartNetworkInputMessageTranscoder = deriveTranscoder(StartNetworkInputMessageSchema)

export const StartNetworkInputMessageInputGuard = deriveInputGuard(StartNetworkInputMessageSchema)

export const StartNetworkInputMessageGuard = deriveGuard(StartNetworkInputMessageSchema)
