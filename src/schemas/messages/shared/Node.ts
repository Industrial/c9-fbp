import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'

export const NodeSchema = S.Struct({
  id: NodeIDSchema,
  component: S.String(),
  metadata: MetadataNodeSchema,
})

export type NodeInput = S.InputOf<typeof NodeSchema>

export type Node = S.OutputOf<typeof NodeSchema>

export const NodeTranscoder = deriveTranscoder(NodeSchema)

export const NodeInputGuard = deriveInputGuard(NodeSchema)

export const NodeGuard = deriveGuard(NodeSchema)
