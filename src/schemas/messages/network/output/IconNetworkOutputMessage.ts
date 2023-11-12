import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const IconNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['icon']>('icon'),
    payload: S.Struct({
      graph: GraphIDSchema,
      icon: S.String(),
      nodeid: NodeIDSchema,
    }),
  })

export type IconNetworkOutputMessageInput = S.OutputOf<typeof IconNetworkOutputMessageSchema>

export type IconNetworkOutputMessage = S.OutputOf<typeof IconNetworkOutputMessageSchema>

export const IconNetworkOutputMessageTranscoder = deriveTranscoder(IconNetworkOutputMessageSchema)

export const IconNetworkOutputMessageInputGuard = deriveInputGuard(IconNetworkOutputMessageSchema)

export const IconNetworkOutputMessageGuard = deriveGuard(IconNetworkOutputMessageSchema)
