import * as E from 'fp-ts/Either.ts'
import * as EdgeDomain from './edge.ts'
import * as Eq from 'fp-ts/Eq.ts'
import * as GraphDomain from './graph.ts'
import * as GraphSchema from '#/schemas/messages/shared/Graph.ts'
import * as GroupDomain from './group.ts'
import * as IIPDomain from './iip.ts'
import * as NodeDomain from './node.ts'
import * as PortDomain from './port.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as S from 'fp-ts/string.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { TargetNode } from '#/schemas/messages/shared/TargetNode.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'
import { findFirstByPredicateE, findFirstByPropertyE } from '#/helpers.ts'
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

export const eq: Eq.Eq<Graph> = Eq.fromEquals((a, b) => {
  return a.id === b.id
})

export const toGraphErrorGraphInput = <T>(error: Error): ReadonlyArray<T | ErrorGraphOutputMessageInput> => {
  return [
    {
      protocol: 'graph',
      command: 'error',
      payload: {
        message: error.message,
      },
    },
  ]
}

export const findNodeById = (id: NodeDomain.Node['id']) => {
  return (graph: GraphDomain.Graph): E.Either<Error, NodeDomain.Node> => {
    return pipe(
      graph.nodes,
      findFirstByPropertyE('id', id),
      E.mapLeft(() => {
        return new Error('NodeNotFound')
      }),
    )
  }
}

export const containsNodeById = (id: NodeDomain.Node['id']) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return pipe(
      graph.nodes,
      findFirstByPropertyE('id', id),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('NodeNotFound')
      }),
    )
  }
}

export const containsAllNodesById = (ids: ReadonlyArray<NodeDomain.Node['id']>) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return pipe(
      graph,
      E.fromPredicate(
        () => {
          return RA.getEq(S.Eq).equals(
            pipe(
              graph.nodes,
              RA.map((node) => {
                return node.id
              }),
              RA.sort(S.Ord),
            ),
            pipe(
              ids,
              RA.sort(S.Ord),
            ),
          )
        },
        () => {
          return new Error('NodeNotFound')
        },
      ),
    )
  }
}

export const withoutNode = (node: NodeDomain.Node) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return E.right({
      ...graph,
      nodes: pipe(
        graph.nodes,
        RA.filter((entry) => {
          return !NodeDomain.eq.equals(entry, node)
        }),
      ),
    })
  }
}

export const withNode = (node: NodeDomain.Node) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return E.right({
      ...graph,
      nodes: pipe(
        graph.nodes,
        RA.filter((entry) => {
          return !NodeDomain.eq.equals(entry, node)
        }),
        RA.append(node),
      ),
    })
  }
}

export const findEdgeByTargetNode = (src: TargetNode, tgt: TargetNode) => {
  return (graph: GraphDomain.Graph): E.Either<Error, EdgeDomain.Edge> => {
    return pipe(
      graph.edges,
      findFirstByPredicateE((edge) => {
        return EdgeDomain.eq.equals(
          edge,
          EdgeDomain.create(
            src.node,
            src.port,
            tgt.node,
            tgt.port,
            {
              route: undefined,
              schema: undefined,
              secure: undefined,
            },
          ),
        )
      }),
      E.mapLeft(() => {
        return new Error('EdgeNotFound')
      }),
    )
  }
}

export const withoutEdge = (edge: EdgeDomain.Edge) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return E.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter((entry) => {
          return !EdgeDomain.eq.equals(edge, entry)
        }),
      ),
    })
  }
}

export const withEdge = (edge: EdgeDomain.Edge) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return E.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter((entry) => {
          return !EdgeDomain.eq.equals(entry, edge)
        }),
        RA.append(edge),
      ),
    })
  }
}

export const findGroupByName = (name: GroupDomain.Group['name']) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GroupDomain.Group> => {
    return pipe(
      graph.groups,
      findFirstByPropertyE('name', name),
      E.mapLeft(() => {
        return new Error('GroupNotFound')
      }),
    )
  }
}

export const withoutGroup = (group: GroupDomain.Group) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return E.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter((entry) => {
          return !GroupDomain.eq.equals(entry, group)
        }),
      ),
    })
  }
}

export const withGroup = (group: GroupDomain.Group) => {
  return (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> => {
    return E.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter((entry) => {
          return !GroupDomain.eq.equals(entry, group)
        }),
        RA.append(group),
      ),
    })
  }
}

export const containsIIPByNodeIdAndPortId =
  (iip: IIPDomain.IIP, nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((node) =>
        pipe(
          node,
          NodeDomain.findInportById(portId),
          E.chain((port) =>
            pipe(
              port,
              PortDomain.containsIIP(iip),
              E.map(() => graph),
            )
          ),
          E.map(() => graph),
        )
      ),
    )

export const withIIPByNodeIdAndPortId =
  (iip: IIPDomain.IIP, nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.findInportById(portId)),
          E.chain((oldPort) =>
            pipe(
              E.right(oldPort),
              E.chain(PortDomain.withIIP(iip)),
              E.chain((newPort) =>
                pipe(
                  oldNode,
                  NodeDomain.withInport(newPort),
                )
              ),
            )
          ),
          E.chain((newNode) =>
            pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          ),
          E.map(() => graph),
        )
      ),
    )

export const withoutIIPByNodeIdAndPortId =
  (nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.findInportById(portId)),
          E.chain((oldPort) =>
            pipe(
              E.right(oldPort),
              E.chain(PortDomain.withoutIIP()),
              E.chain((newPort) =>
                pipe(
                  oldNode,
                  NodeDomain.withInport(newPort),
                )
              ),
            )
          ),
          E.chain((newNode) =>
            pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          ),
          E.map(() => graph),
        )
      ),
    )

export const containsInportByNodeIdAndPortId =
  (nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((node) =>
        pipe(
          node,
          NodeDomain.findInportById(portId),
          E.map(() => graph),
        )
      ),
    )

export const withInportByNodeId =
  (port: PortDomain.Port, nodeId: NodeDomain.Node['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.withInport(port)),
          E.chain((newNode) => {
            return pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          }),
        )
      ),
    )

export const withoutInportByNodeId =
  (port: PortDomain.Port, nodeId: NodeDomain.Node['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.withoutInport(port)),
          E.chain((newNode) => {
            return pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          }),
        )
      ),
    )

export const withoutInportByNodeIdAndPortId =
  (nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.findInportById(portId)),
          E.chain((port) =>
            pipe(
              E.right(oldNode),
              E.chain(NodeDomain.withoutInport(port)),
              E.chain((newNode) => {
                return pipe(
                  graph,
                  GraphDomain.withNode(newNode),
                )
              }),
            )
          ),
        )
      ),
    )

export const containsOutportByNodeIdAndPortId =
  (nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((node) =>
        pipe(
          node,
          NodeDomain.findOutportById(portId),
          E.map(() => graph),
        )
      ),
    )

export const withOutportByNodeId =
  (port: PortDomain.Port, nodeId: NodeDomain.Node['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.withOutport(port)),
          E.chain((newNode) => {
            return pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          }),
        )
      ),
    )

export const withoutOutportByNodeId =
  (port: PortDomain.Port, nodeId: NodeDomain.Node['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.withoutOutport(port)),
          E.chain((newNode) => {
            return pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          }),
        )
      ),
    )

export const withoutOutportByNodeIdAndPortId =
  (nodeId: NodeDomain.Node['id'], portId: PortDomain.Port['id']) =>
  (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      GraphDomain.findNodeById(nodeId),
      E.chain((oldNode) =>
        pipe(
          E.right(oldNode),
          E.chain(NodeDomain.findOutportById(portId)),
          E.chain((port) =>
            pipe(
              E.right(oldNode),
              E.chain(NodeDomain.withoutOutport(port)),
              E.chain((newNode) => {
                return pipe(
                  graph,
                  GraphDomain.withNode(newNode),
                )
              }),
            )
          ),
        )
      ),
    )

export const hasNetworkStarted = () => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.network.hasStarted,
      E.fromPredicate(
        (hasStarted) => {
          return hasStarted
        },
        () => {
          return new Error('NotStarted')
        },
      ),
      E.map(() => {
        return graph
      }),
    )
  }
}

export const withNetworkStart = () => {
  return (graph: Graph): E.Either<Error, Graph> => {
    const newGraph: Graph = {
      ...graph,
      network: {
        isDebugging: graph.network.isDebugging,
        isRunning: true,
        hasStarted: true,
        startTime: new Date().toISOString(),
      },
    }

    return E.right(newGraph)
  }
}

export const withNetworkStop = () => {
  return (graph: Graph): E.Either<Error, Graph> => {
    const newGraph: Graph = {
      ...graph,
      network: {
        isDebugging: graph.network.isDebugging,
        isRunning: false,
        hasStarted: false,
        startTime: graph.network.startTime,
      },
    }

    return E.right(newGraph)
  }
}
