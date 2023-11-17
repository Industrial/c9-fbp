import * as EdgeDomain from '#/domain1/edge.ts'
import * as GraphSchema from '#/schemas/messages/shared/Graph.ts'
import * as GroupDomain from '#/domain1/group.ts'
import * as IIPDomain from '#/domain1/iip.ts'
import * as NodeDomain from '#/domain1/node.ts'
import * as PortDomain from '#/domain1/port.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'
import { pipe } from 'fp-ts/function.ts'

export type GraphID = string

export type Graph = {
  id: GraphID
  main: boolean
  name: string
  nodes: ReadonlyArray<NodeDomain.Node>
  edges: ReadonlyArray<EdgeDomain.Edge>
  groups: ReadonlyArray<GroupDomain.Group>
  library?: string
  description?: string
  icon?: string
  network: {
    isDebugging: boolean
    isRunning: boolean
    hasStarted: boolean
    startTime: string
  }
}

export const create = (
  id: Graph['id'],
  name: Graph['name'],
  nodes: Graph['nodes'],
  edges: Graph['edges'],
  groups: Graph['groups'],
  main: Graph['main'] = false,
  library?: Graph['library'],
  description?: Graph['description'],
  icon?: Graph['icon'],
): Graph => {
  return {
    id,
    main,
    name,
    nodes,
    edges,
    groups,
    library,
    description,
    icon,
    network: {
      isDebugging: false,
      isRunning: false,
      hasStarted: false,
      startTime: new Date().toISOString(),
    },
  }
}

export const serialize = (graph: Graph): GraphSchema.Graph => {
  const inports: GraphSchema.Graph['inports'] = pipe(
    graph.nodes,
    RA.map((node) => {
      return pipe(
        node.inports,
        RA.mapWithIndex((index, port) => {
          return PortDomain.serialize(port, node, index)
        }),
      )
    }),
    RA.flatten,
  )

  const outports: GraphSchema.Graph['outports'] = pipe(
    graph.nodes,
    RA.map((node) => {
      return pipe(
        node.outports,
        RA.mapWithIndex((index, port) => {
          return PortDomain.serialize(port, node, index)
        }),
      )
    }),
    RA.flatten,
  )

  const iips: GraphSchema.Graph['iips'] = pipe(
    graph.nodes,
    RA.map((node) => {
      return pipe(
        node.inports,
        RA.filter((port) => {
          return Boolean(port.iip)
        }),
        RA.map((port) => {
          return IIPDomain.serialize(
            {
              data: port.iip!.data as unknown as Value,
              metadata: port.iip!.metadata,
            },
            node,
            port,
          )
        }),
      )
    }),
    RA.flatten,
  )

  const input: GraphSchema.GraphInput = {
    id: graph.id,
    main: graph.main,
    name: graph.name,
    nodes: graph.nodes,
    edges: pipe(graph.edges, RA.map(EdgeDomain.serialize)),
    groups: pipe(graph.groups, RA.map(GroupDomain.serialize)),
    library: graph.library,
    description: graph.description,
    icon: graph.icon,
    network: {
      isDebugging: graph.network.isDebugging,
      isRunning: graph.network.isRunning,
      hasStarted: graph.network.hasStarted,
      startTime: graph.network.startTime,
    },
    inports,
    outports,
    iips,
  }

  return GraphSchema.GraphTranscoder.decode(input)
}

export const deserialize = (graph: GraphSchema.Graph): Graph => {
  const nodes = pipe(
    graph.nodes,
    RA.map((node) => {
      return NodeDomain.deserialize(node, graph)
    }),
  )

  const edges = pipe(
    graph.edges,
    RA.map((edge) => {
      return EdgeDomain.deserialize(edge)
    }),
  )

  const groups = pipe(
    graph.groups,
    RA.map((group) => {
      return GroupDomain.deserialize(group)
    }),
  )

  return create(
    graph.id,
    graph.name,
    nodes,
    edges,
    groups,
    graph.main,
    graph.library,
    graph.description,
    graph.icon,
  )
}
