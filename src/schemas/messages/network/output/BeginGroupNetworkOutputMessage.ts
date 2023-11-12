import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const BeginGroupNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['begingroup']>('begingroup'),
    payload: S.Struct({
      id: S.String(),
      src: PortIDSchema,
      tgt: PortIDSchema,
      graph: GraphIDSchema,
      subgraph: S.Array(NodeIDSchema),
      group: S.String(),
    }),
  })

export type BeginGroupNetworkOutputMessageInput = S.OutputOf<typeof BeginGroupNetworkOutputMessageSchema>

export type BeginGroupNetworkOutputMessage = S.OutputOf<typeof BeginGroupNetworkOutputMessageSchema>

export const BeginGroupNetworkOutputMessageTranscoder = deriveTranscoder(BeginGroupNetworkOutputMessageSchema)

export const BeginGroupNetworkOutputMessageInputGuard = deriveInputGuard(BeginGroupNetworkOutputMessageSchema)

export const BeginGroupNetworkOutputMessageGuard = deriveGuard(BeginGroupNetworkOutputMessageSchema)
