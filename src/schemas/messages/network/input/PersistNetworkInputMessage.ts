import * as S from 'schemata-ts'
import { NetworkInputMessageBaseSchema } from '#/schemas/messages/network/NetworkInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PersistNetworkInputMessageSchema = NetworkInputMessageBaseSchema
  .extend({
    command: S.Literal<['persist']>('persist'),
    payload: S.Struct({}),
  })

export type PersistNetworkInputMessageInput = S.InputOf<typeof PersistNetworkInputMessageSchema>

export type PersistNetworkInputMessage = S.OutputOf<typeof PersistNetworkInputMessageSchema>

export const PersistNetworkInputMessageTranscoder = deriveTranscoder(PersistNetworkInputMessageSchema)

export const PersistNetworkInputMessageInputGuard = deriveInputGuard(PersistNetworkInputMessageSchema)

export const PersistNetworkInputMessageGuard = deriveGuard(PersistNetworkInputMessageSchema)
