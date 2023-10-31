import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const PortSchema = S.Struct({
  node: NodeIDSchema,
  port: PortIDSchema,
  index: S.Optional(S.Union(S.Float(), S.String())),
})

export type PortInput = S.InputOf<typeof PortSchema>

export type Port = S.OutputOf<typeof PortSchema>

export const PortTranscoder = deriveTranscoder(PortSchema)
