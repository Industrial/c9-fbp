import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const TargetNodeSchema = S.Struct({
  node: NodeIDSchema,
  port: PortIDSchema,
})

export type TargetNodeInput = S.InputOf<typeof TargetNodeSchema>

export type TargetNode = S.OutputOf<typeof TargetNodeSchema>

export const TargetNodeTranscoder = deriveTranscoder(TargetNodeSchema)

export const TargetNodeInputGuard = deriveInputGuard(TargetNodeSchema)

export const TargetNodeGuard = deriveGuard(TargetNodeSchema)
