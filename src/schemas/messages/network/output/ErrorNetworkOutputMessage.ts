import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ErrorNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
      stack: S.Optional(S.String()),
      graph: GraphIDSchema,
    }),
  })

export type ErrorNetworkOutputMessageInput = S.OutputOf<typeof ErrorNetworkOutputMessageSchema>

export type ErrorNetworkOutputMessage = S.OutputOf<typeof ErrorNetworkOutputMessageSchema>

export const ErrorNetworkOutputMessageTranscoder = deriveTranscoder(ErrorNetworkOutputMessageSchema)

export const ErrorNetworkOutputMessageInputGuard = deriveInputGuard(ErrorNetworkOutputMessageSchema)

export const ErrorNetworkOutputMessageGuard = deriveGuard(ErrorNetworkOutputMessageSchema)
