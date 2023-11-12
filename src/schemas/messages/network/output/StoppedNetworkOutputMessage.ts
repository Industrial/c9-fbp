import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const StoppedNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['stopped']>('stopped'),
    payload: S.Struct({
      time: S.DateFromString(),
      uptime: S.Number,
      graph: GraphIDSchema,
      running: S.Boolean,
      started: S.Boolean,
      debug: S.Boolean,
    }),
  })

export type StoppedNetworkOutputMessageInput = S.OutputOf<typeof StoppedNetworkOutputMessageSchema>

export type StoppedNetworkOutputMessage = S.OutputOf<typeof StoppedNetworkOutputMessageSchema>

export const StoppedNetworkOutputMessageTranscoder = deriveTranscoder(StoppedNetworkOutputMessageSchema)

export const StoppedNetworkOutputMessageInputGuard = deriveInputGuard(StoppedNetworkOutputMessageSchema)

export const StoppedNetworkOutputMessageGuard = deriveGuard(StoppedNetworkOutputMessageSchema)
