import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'

export const NetworkEventSchema = S.Struct({
  id: S.String(),
  src: PortSchema,
  tgt: PortSchema,
  graph: GraphIDSchema,
  subgraph: S.Array(NodeIDSchema),
})

export type NetworkEventInput = S.InputOf<typeof NetworkEventSchema>

export type NetworkEvent = S.OutputOf<typeof NetworkEventSchema>

export const NetworkEventTranscoder = deriveTranscoder(NetworkEventSchema)
