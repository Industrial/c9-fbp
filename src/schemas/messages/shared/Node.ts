import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'

export const NodeSchema = S.Struct({
  id: S.String(),
  component: S.String(),
  metadata: MetadataNodeSchema,
})

export type NodeInput = S.InputOf<typeof NodeSchema>

export type Node = S.OutputOf<typeof NodeSchema>

export const NodeTranscoder = deriveTranscoder(NodeSchema)

export const NodeInputGuard = deriveInputGuard(NodeSchema)

export const NodeGuard = deriveGuard(NodeSchema)
