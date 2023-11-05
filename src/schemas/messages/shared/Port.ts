import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'

export const PortSchema = S.Struct({
  index: S.Optional(S.Union(S.Float(), S.String())),
  metadata: MetadataNodeSchema,
  node: NodeIDSchema,
  port: PortIDSchema,
  public: PortIDSchema,
})

export type PortInput = S.InputOf<typeof PortSchema>

export type Port = S.OutputOf<typeof PortSchema>

export const PortTranscoder = deriveTranscoder(PortSchema)
