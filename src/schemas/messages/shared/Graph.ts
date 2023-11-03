import * as S from 'schemata-ts'
import { Edge, EdgeInput, EdgeSchema } from '#/schemas/messages/shared/Edge.ts'
import { GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { Node, NodeInput, NodeSchema } from '#/schemas/messages/shared/Node.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { Group, GroupInput, GroupSchema } from '#/schemas/messages/shared/Group.ts'

export type GraphInput = {
  id: GraphIDInput
  main: boolean
  name: string
  description?: string
  icon?: string
  library?: string
  groups: ReadonlyArray<GroupInput>
  nodes: ReadonlyArray<NodeInput>
  edges: ReadonlyArray<EdgeInput>
}

export type Graph = {
  id: GraphIDInput
  main: boolean
  name: string
  description: string | undefined
  icon: string | undefined
  library: string | undefined
  groups: ReadonlyArray<Group>
  nodes: ReadonlyArray<Node>
  edges: ReadonlyArray<Edge>
}

export const GraphSchema = S.Struct({
  id: GraphIDSchema,
  main: S.Boolean,
  name: S.String(),
  description: S.Optional(S.String()),
  icon: S.Optional(S.String()),
  library: S.Optional(S.String()),
  groups: S.Array(GroupSchema),
  nodes: S.Array(NodeSchema),
  edges: S.Array(EdgeSchema),
})

export const GraphTranscoder = deriveTranscoder<GraphInput, Graph>(GraphSchema)
