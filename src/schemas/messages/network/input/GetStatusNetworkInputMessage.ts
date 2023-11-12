import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkInputMessageBaseSchema } from '#/schemas/messages/network/NetworkInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GetStatusNetworkInputMessageSchema = NetworkInputMessageBaseSchema
  .extend({
    command: S.Literal<['getstatus']>('getstatus'),
    payload: S.Struct({
      graph: GraphIDSchema,
    }),
  })

export type GetStatusNetworkInputMessageInput = S.InputOf<typeof GetStatusNetworkInputMessageSchema>

export type GetStatusNetworkInputMessage = S.OutputOf<typeof GetStatusNetworkInputMessageSchema>

export const GetStatusNetworkInputMessageTranscoder = deriveTranscoder(GetStatusNetworkInputMessageSchema)

export const GetStatusNetworkInputMessageInputGuard = deriveInputGuard(GetStatusNetworkInputMessageSchema)

export const GetStatusNetworkInputMessageGuard = deriveGuard(GetStatusNetworkInputMessageSchema)
