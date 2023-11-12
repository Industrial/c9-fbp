import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const OutputNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['output']>('output'),
    payload: S.Struct({
      id: S.String(),
      src: PortIDSchema,
      tgt: PortIDSchema,
      graph: GraphIDSchema,
      subgraph: S.Array(NodeIDSchema),
      message: S.String(),
      type: S.Either(S.Literal('message'), S.Literal('previewurl')),
      url: S.Optional(S.String()),
    }),
  })

export type OutputNetworkOutputMessageInput = S.OutputOf<typeof OutputNetworkOutputMessageSchema>

export type OutputNetworkOutputMessage = S.OutputOf<typeof OutputNetworkOutputMessageSchema>

export const OutputNetworkOutputMessageTranscoder = deriveTranscoder(OutputNetworkOutputMessageSchema)

export const OutputNetworkOutputMessageInputGuard = deriveInputGuard(OutputNetworkOutputMessageSchema)

export const OutputNetworkOutputMessageGuard = deriveGuard(OutputNetworkOutputMessageSchema)
