import * as E from 'fp-ts/Either.ts'
import * as EdgeDomain from '#/domain/edge.ts'
import * as Eq from 'fp-ts/Eq.ts'
import * as GroupDomain from '#/domain/group.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as O from 'fp-ts/Option.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as equals from '#/equals.ts'
import { ReadonlyRecord } from 'fp-ts/ReadonlyRecord.ts'
import { lens as L, traversal as T } from 'monocle-ts'
import { pipe } from 'fp-ts/function.ts'

export type Graph = {
  id: string
  main: boolean
  name: string
  nodes: ReadonlyRecord<NodeDomain.Node['id'], NodeDomain.Node>
  edges: ReadonlyRecord<EdgeDomain.EdgeId, EdgeDomain.Edge>
  groups: ReadonlyRecord<GroupDomain.Group['name'], GroupDomain.Group>
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

export const eq: Eq.Eq<Graph> = Eq.fromEquals(equals.byProperty('id'))

export const findNodeById = (id: NodeDomain.Node['id']) => (graph: Graph) =>
  pipe(
    graph,
    pipe(
      L.id<Graph>(),
      L.prop('nodes'),
      L.atKey(id),
    ).get,
  )

export const nodeNotFoundError = () => new Error('NodeNotFound')

export const findNodeByIdE = (id: NodeDomain.Node['id']) => (graph: Graph) =>
  pipe(
    graph,
    findNodeById(id),
    E.fromOption(nodeNotFoundError),
  )

export const hasAllNodesById = (as: ReadonlyArray<NodeDomain.Node['id']>) => (graph: Graph) =>
  pipe(
    as,
    RA.every((a) => O.isSome(findNodeById(a)(graph))),
  )

export const hasAllNodesByIdE = (as: ReadonlyArray<NodeDomain.Node['id']>) => (graph: Graph) =>
  pipe(
    graph,
    E.fromPredicate(
      hasAllNodesById(as),
      nodeNotFoundError,
    ),
  )

export const modifyNodeAtId =
  (id: NodeDomain.Node['id']) => (f: (port: O.Option<NodeDomain.Node>) => O.Option<NodeDomain.Node>) =>
    pipe(
      T.id<Graph>(),
      T.prop('nodes'),
      T.atKey(id),
      T.modify(f),
    )

export const findEdgeByEdgeId = (id: EdgeDomain.EdgeId) => (graph: Graph) =>
  pipe(
    graph,
    pipe(
      L.id<Graph>(),
      L.prop('edges'),
      L.atKey(id),
    ).get,
  )

export const edgeNotFoundError = () => new Error('EdgeNotFound')

export const findEdgeByEdgeIdE = (id: EdgeDomain.EdgeId) => (graph: Graph) =>
  pipe(
    graph,
    findEdgeByEdgeId(id),
    E.fromOption(edgeNotFoundError),
  )

export const modifyEdgeAtEdgeId =
  (edgeID: EdgeDomain.EdgeId) => (f: (edge: O.Option<EdgeDomain.Edge>) => O.Option<EdgeDomain.Edge>) =>
    pipe(
      T.id<Graph>(),
      T.prop('edges'),
      T.atKey(edgeID),
      T.modify(f),
    )

export const findGroupByName = (name: GroupDomain.Group['name']) => (graph: Graph) =>
  pipe(
    graph,
    pipe(
      L.id<Graph>(),
      L.prop('groups'),
      L.atKey(name),
    ).get,
  )

export const groupNotFoundError = () => new Error('GroupNotFound')

export const findGroupByNameE = (name: GroupDomain.Group['name']) => (graph: Graph) =>
  pipe(
    graph,
    findGroupByName(name),
    E.fromOption(groupNotFoundError),
  )

export const modifyGroupAtName =
  (name: GroupDomain.Group['name']) => (f: (port: O.Option<GroupDomain.Group>) => O.Option<GroupDomain.Group>) =>
    pipe(
      T.id<Graph>(),
      T.prop('groups'),
      T.atKey(name),
      T.modify(f),
    )

export const hasNetworkStarted = (graph: Graph) => graph.network.hasStarted

export const startNetwork = pipe(
  T.id<Graph>(),
  T.prop('network'),
  T.modify((a) => ({
    isDebugging: a.isDebugging,
    isRunning: true,
    hasStarted: true,
    startTime: new Date().toISOString(),
  })),
)

export const stopNetwork = pipe(
  T.id<Graph>(),
  T.prop('network'),
  T.modify((a) => ({
    isDebugging: a.isDebugging,
    isRunning: false,
    hasStarted: false,
    startTime: a.startTime,
  })),
)
