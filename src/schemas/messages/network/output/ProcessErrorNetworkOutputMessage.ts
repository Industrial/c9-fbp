import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ProcessErrorNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['processerror']>('processerror'),
    payload: S.Struct({
      nodeid: NodeIDSchema,
      error: S.String(),
      graph: GraphIDSchema,
    }),
  })

export type ProcessErrorNetworkOutputMessageInput = S.OutputOf<typeof ProcessErrorNetworkOutputMessageSchema>

export type ProcessErrorNetworkOutputMessage = S.OutputOf<typeof ProcessErrorNetworkOutputMessageSchema>

export const ProcessErrorNetworkOutputMessageTranscoder = deriveTranscoder(ProcessErrorNetworkOutputMessageSchema)

export const ProcessErrorNetworkOutputMessageInputGuard = deriveInputGuard(ProcessErrorNetworkOutputMessageSchema)

export const ProcessErrorNetworkOutputMessageGuard = deriveGuard(ProcessErrorNetworkOutputMessageSchema)
