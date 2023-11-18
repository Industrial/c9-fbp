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
): Graph => ({
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
})

export const serialize = (graph: Graph): GraphSchema.Graph =>
  GraphSchema.GraphTranscoder.decode({
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
    inports: pipe(
      graph.nodes,
      RA.map((node) =>
        pipe(
          node.inports,
          RA.mapWithIndex((index, port) => PortDomain.serialize(port, node, index)),
        )
      ),
      RA.flatten,
    ),
    outports: pipe(
      graph.nodes,
      RA.map((node) =>
        pipe(
          node.outports,
          RA.mapWithIndex((index, port) => PortDomain.serialize(port, node, index)),
        )
      ),
      RA.flatten,
    ),
    iips: pipe(
      graph.nodes,
      RA.map((node) =>
        pipe(
          node.inports,
          RA.filter((port) => Boolean(port.iip)),
          RA.map((port) =>
            IIPDomain.serialize(
              {
                data: port.iip!.data as unknown as Value,
                metadata: port.iip!.metadata,
              },
              node,
              port,
            )
          ),
        )
      ),
      RA.flatten,
    ),
  })

export const deserialize = (graph: GraphSchema.Graph): Graph =>
  create(
    graph.id,
    graph.name,
    pipe(
      graph.nodes,
      RA.map((node) => NodeDomain.deserialize(node, graph)),
    ),
    pipe(
      graph.edges,
      RA.map((edge) => EdgeDomain.deserialize(edge)),
    ),
    pipe(
      graph.groups,
      RA.map((group) => GroupDomain.deserialize(group)),
    ),
    graph.main,
    graph.library,
    graph.description,
    graph.icon,
  )

export const eq: Eq.Eq<Graph> = Eq.fromEquals((a, b) => a.id === b.id)

export const toGraphErrorGraphInput = <T>(error: Error): ReadonlyArray<T | ErrorGraphOutputMessageInput> => [
  {
    protocol: 'graph',
    command: 'error',
    payload: {
      message: error.message,
    },
  },
]

export const findNodeById =
  (id: NodeDomain.Node['id']) => (graph: GraphDomain.Graph): E.Either<Error, NodeDomain.Node> =>
    pipe(
      graph.nodes,
      findFirstByPropertyE('id', id),
      E.mapLeft(() => new Error('NodeNotFound')),
    )

export const containsNodeById =
  (id: NodeDomain.Node['id']) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph.nodes,
      findFirstByPropertyE('id', id),
      E.map(() => graph),
      E.mapLeft(() => new Error('NodeNotFound')),
    )

export const containsAllNodesById =
  (ids: ReadonlyArray<NodeDomain.Node['id']>) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    pipe(
      graph,
      E.fromPredicate(
        () =>
          RA.getEq(S.Eq).equals(
            pipe(
              graph.nodes,
              RA.map((node) => node.id),
              RA.sort(S.Ord),
            ),
            pipe(
              ids,
              RA.sort(S.Ord),
            ),
          ),
        () => new Error('NodeNotFound'),
      ),
    )

export const withoutNode = (node: NodeDomain.Node) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
  E.right({
    ...graph,
    nodes: pipe(
      graph.nodes,
      RA.filter((entry) => !NodeDomain.eq.equals(entry, node)),
    ),
  })

export const withNode = (node: NodeDomain.Node) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
  E.right({
    ...graph,
    nodes: pipe(
      graph.nodes,
      RA.filter((entry) => !NodeDomain.eq.equals(entry, node)),
      RA.append(node),
    ),
  })

export const findEdgeByTargetNode =
  (src: TargetNode, tgt: TargetNode) => (graph: GraphDomain.Graph): E.Either<Error, EdgeDomain.Edge> =>
    pipe(
      graph.edges,
      findFirstByPredicateE((edge) =>
        EdgeDomain.eq.equals(
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
      ),
      E.mapLeft(() => new Error('EdgeNotFound')),
    )

export const withoutEdge = (edge: EdgeDomain.Edge) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
  E.right({
    ...graph,
    edges: pipe(
      graph.edges,
      RA.filter((entry) => !EdgeDomain.eq.equals(edge, entry)),
    ),
  })

export const withEdge = (edge: EdgeDomain.Edge) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
  E.right({
    ...graph,
    edges: pipe(
      graph.edges,
      RA.filter((entry) => !EdgeDomain.eq.equals(entry, edge)),
      RA.append(edge),
    ),
  })

export const findGroupByName =
  (name: GroupDomain.Group['name']) => (graph: GraphDomain.Graph): E.Either<Error, GroupDomain.Group> =>
    pipe(
      graph.groups,
      findFirstByPropertyE('name', name),
      E.mapLeft(() => new Error('GroupNotFound')),
    )

export const withoutGroup =
  (group: GroupDomain.Group) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
    E.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter((entry) => !GroupDomain.eq.equals(entry, group)),
      ),
    })

export const withGroup = (group: GroupDomain.Group) => (graph: GraphDomain.Graph): E.Either<Error, GraphDomain.Graph> =>
  E.right({
    ...graph,
    groups: pipe(
      graph.groups,
      RA.filter((entry) => !GroupDomain.eq.equals(entry, group)),
      RA.append(group),
    ),
  })

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
          E.chain((newNode) =>
            pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          ),
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
          E.chain((newNode) =>
            pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          ),
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
              E.chain((newNode) =>
                pipe(
                  graph,
                  GraphDomain.withNode(newNode),
                )
              ),
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
          E.chain((newNode) =>
            pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          ),
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
          E.chain((newNode) =>
            pipe(
              graph,
              GraphDomain.withNode(newNode),
            )
          ),
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
              E.chain((newNode) =>
                pipe(
                  graph,
                  GraphDomain.withNode(newNode),
                )
              ),
            )
          ),
        )
      ),
    )

export const hasNetworkStarted = () => (graph: Graph): E.Either<Error, Graph> =>
  pipe(
    graph.network.hasStarted,
    E.fromPredicate(
      (hasStarted) => hasStarted,
      () => new Error('NotStarted'),
    ),
    E.map(() => graph),
  )

export const withNetworkStart = () => (graph: Graph): E.Either<Error, Graph> =>
  E.right({
    ...graph,
    network: {
      isDebugging: graph.network.isDebugging,
      isRunning: true,
      hasStarted: true,
      startTime: new Date().toISOString(),
    },
  })

export const withNetworkStop = () => (graph: Graph): E.Either<Error, Graph> =>
  E.right({
    ...graph,
    network: {
      isDebugging: graph.network.isDebugging,
      isRunning: false,
      hasStarted: false,
      startTime: graph.network.startTime,
    },
  })
