import * as S from 'schemata-ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { NodeSchema } from '#/schemas/messages/shared/Node.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GroupSchema = S.Struct({
  name: S.String(),
  nodes: S.Array(NodeSchema),
  metadata: MetadataGroupSchema,
})

export type GroupInput = S.InputOf<typeof GroupSchema>

export type Group = S.OutputOf<typeof GroupSchema>

export const GroupTranscoder = deriveTranscoder(GroupSchema)

export const GroupInputGuard = deriveInputGuard(GroupSchema)

export const GroupGuard = deriveGuard(GroupSchema)
