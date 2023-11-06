import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const NetworkEventSchema = S.Struct({
  id: S.String(),
  src: TargetNodeSchema,
  tgt: TargetNodeSchema,
  graph: GraphIDSchema,
  subgraph: S.Array(NodeIDSchema),
})

export type NetworkEventInput = S.InputOf<typeof NetworkEventSchema>

export type NetworkEvent = S.OutputOf<typeof NetworkEventSchema>

export const NetworkEventTranscoder = deriveTranscoder(NetworkEventSchema)
