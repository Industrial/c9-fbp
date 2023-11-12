import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ConnectNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['connect']>('connect'),
    payload: S.Struct({
      id: S.String(),
      src: PortIDSchema,
      tgt: PortIDSchema,
      graph: GraphIDSchema,
      subgraph: S.Array(NodeIDSchema),
    }),
  })

export type ConnectNetworkOutputMessageInput = S.OutputOf<typeof ConnectNetworkOutputMessageSchema>

export type ConnectNetworkOutputMessage = S.OutputOf<typeof ConnectNetworkOutputMessageSchema>

export const ConnectNetworkOutputMessageTranscoder = deriveTranscoder(ConnectNetworkOutputMessageSchema)

export const ConnectNetworkOutputMessageInputGuard = deriveInputGuard(ConnectNetworkOutputMessageSchema)

export const ConnectNetworkOutputMessageGuard = deriveGuard(ConnectNetworkOutputMessageSchema)
