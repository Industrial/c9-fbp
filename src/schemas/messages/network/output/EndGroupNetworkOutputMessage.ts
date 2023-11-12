import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const EndGroupNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['endgroup']>('endgroup'),
    payload: S.Struct({
      id: S.String(),
      src: PortIDSchema,
      tgt: PortIDSchema,
      graph: GraphIDSchema,
      subgraph: S.Array(NodeIDSchema),
      group: S.String(),
    }),
  })

export type EndGroupNetworkOutputMessageInput = S.OutputOf<typeof EndGroupNetworkOutputMessageSchema>

export type EndGroupNetworkOutputMessage = S.OutputOf<typeof EndGroupNetworkOutputMessageSchema>

export const EndGroupNetworkOutputMessageTranscoder = deriveTranscoder(EndGroupNetworkOutputMessageSchema)

export const EndGroupNetworkOutputMessageInputGuard = deriveInputGuard(EndGroupNetworkOutputMessageSchema)

export const EndGroupNetworkOutputMessageGuard = deriveGuard(EndGroupNetworkOutputMessageSchema)
