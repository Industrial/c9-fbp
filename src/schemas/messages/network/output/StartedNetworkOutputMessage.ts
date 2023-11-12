import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const StartedNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['started']>('started'),
    payload: S.Struct({
      time: S.DateFromIsoString({
        requireTime: 'TimeAndOffset',
      }),
      graph: GraphIDSchema,
      started: S.Boolean,
      running: S.Boolean,
      debug: S.Boolean,
    }),
  })

export type StartedNetworkOutputMessageInput = S.OutputOf<typeof StartedNetworkOutputMessageSchema>

export type StartedNetworkOutputMessage = S.OutputOf<typeof StartedNetworkOutputMessageSchema>

export const StartedNetworkOutputMessageTranscoder = deriveTranscoder(StartedNetworkOutputMessageSchema)

export const StartedNetworkOutputMessageInputGuard = deriveInputGuard(StartedNetworkOutputMessageSchema)

export const StartedNetworkOutputMessageGuard = deriveGuard(StartedNetworkOutputMessageSchema)
