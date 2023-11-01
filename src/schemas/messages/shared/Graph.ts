import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { Edge, EdgeInput, EdgeSchema } from '#/schemas/messages/shared/Edge.ts'
import { GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'

export type GraphInput = {
  id: GraphIDInput
  main: boolean
  name: string
  description?: string
  icon?: string
  library?: string
  nodes: ReadonlyArray<EdgeInput>
  edges: ReadonlyArray<EdgeInput>
}

export type Graph = {
  id: GraphIDInput
  main: boolean
  name: string
  description: string | undefined
  icon: string | undefined
  library: string | undefined
  nodes: ReadonlyArray<Edge>
  edges: ReadonlyArray<Edge>
}

export const GraphSchema = S.Struct({
  id: GraphIDSchema,
  main: S.Boolean,
  name: S.String(),
  description: S.Optional(S.String()),
  icon: S.Optional(S.String()),
  library: S.Optional(S.String()),
  nodes: S.Array(EdgeSchema),
  edges: S.Array(EdgeSchema),
})

export const GraphTranscoder = deriveTranscoder<GraphInput, Graph>(GraphSchema)
