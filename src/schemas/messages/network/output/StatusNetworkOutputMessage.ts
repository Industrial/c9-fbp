import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const StatusNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['status']>('status'),
    payload: S.Struct({
      graph: GraphIDSchema,
      uptime: S.Number,
      started: S.Boolean,
      running: S.Boolean,
      debug: S.Boolean,
    }),
  })

export type StatusNetworkOutputMessageInput = S.OutputOf<typeof StatusNetworkOutputMessageSchema>

export type StatusNetworkOutputMessage = S.OutputOf<typeof StatusNetworkOutputMessageSchema>

export const StatusNetworkOutputMessageTranscoder = deriveTranscoder(StatusNetworkOutputMessageSchema)

export const StatusNetworkOutputMessageInputGuard = deriveInputGuard(StatusNetworkOutputMessageSchema)

export const StatusNetworkOutputMessageGuard = deriveGuard(StatusNetworkOutputMessageSchema)
