import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { ValueSchema } from '#/schemas/messages/shared/Value.ts'

export const DataNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['data']>('data'),
    payload: S.Struct({
      id: S.String(),
      src: PortIDSchema,
      tgt: PortIDSchema,
      graph: GraphIDSchema,
      subgraph: S.Array(NodeIDSchema),
      data: ValueSchema,
      type: S.Optional(S.String()),
      schema: S.Optional(S.String()),
    }),
  })

export type DataNetworkOutputMessageInput = S.OutputOf<typeof DataNetworkOutputMessageSchema>

export type DataNetworkOutputMessage = S.OutputOf<typeof DataNetworkOutputMessageSchema>

export const DataNetworkOutputMessageTranscoder = deriveTranscoder(DataNetworkOutputMessageSchema)

export const DataNetworkOutputMessageInputGuard = deriveInputGuard(DataNetworkOutputMessageSchema)

export const DataNetworkOutputMessageGuard = deriveGuard(DataNetworkOutputMessageSchema)
