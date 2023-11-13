import * as S from 'schemata-ts'
import { EdgeSchema } from '#/schemas/messages/shared/Edge.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GroupSchema } from '#/schemas/messages/shared/Group.ts'
import { IIPSchema } from '#/schemas/messages/shared/IIP.ts'
import { NodeSchema } from '#/schemas/messages/shared/Node.ts'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GraphSchema = S.Struct({
  id: GraphIDSchema,
  main: S.Boolean,
  name: S.String(),
  description: S.Optional(S.String()),
  icon: S.Optional(S.String()),
  library: S.Optional(S.String()),
  network: S.Struct({
    isDebugging: S.Boolean,
    isRunning: S.Boolean,
    hasStarted: S.Boolean,
    startTime: S.String(),
  }),
  edges: S.Array(EdgeSchema),
  groups: S.Array(GroupSchema),
  iips: S.Array(IIPSchema),
  inports: S.Array(PortSchema),
  nodes: S.Array(NodeSchema),
  outports: S.Array(PortSchema),
})

export type GraphInput = S.InputOf<typeof GraphSchema>

export type Graph = S.OutputOf<typeof GraphSchema>

export const GraphTranscoder = deriveTranscoder<GraphInput, Graph>(GraphSchema)

export const GraphInputGuard = deriveInputGuard(GraphSchema)

export const GraphGuard = deriveGuard(GraphSchema)
