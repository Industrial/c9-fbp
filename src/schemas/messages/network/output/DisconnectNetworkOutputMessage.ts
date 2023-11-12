import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const DisconnectNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['disconnect']>('disconnect'),
    payload: S.Struct({
      id: S.String(),
      src: PortIDSchema,
      tgt: PortIDSchema,
      graph: GraphIDSchema,
      subgraph: S.Array(NodeIDSchema),
    }),
  })

export type DisconnectNetworkOutputMessageInput = S.OutputOf<typeof DisconnectNetworkOutputMessageSchema>

export type DisconnectNetworkOutputMessage = S.OutputOf<typeof DisconnectNetworkOutputMessageSchema>

export const DisconnectNetworkOutputMessageTranscoder = deriveTranscoder(DisconnectNetworkOutputMessageSchema)

export const DisconnectNetworkOutputMessageInputGuard = deriveInputGuard(DisconnectNetworkOutputMessageSchema)

export const DisconnectNetworkOutputMessageGuard = deriveGuard(DisconnectNetworkOutputMessageSchema)
