import * as E from 'fp-ts/Either.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as edgeDomain from '#/domain/edge.ts'
import * as groupDomain from '#/domain/group.ts'
import * as nodeDomain from '#/domain/node.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { Group } from '#/schemas/messages/shared/Group.ts'
import { Node } from '#/schemas/messages/shared/Node.ts'
import { pipe } from 'fp-ts/function.ts'

export const toGraphErrorInput = <T>(error: Error): ReadonlyArray<T | ErrorOutputMessageInput> => {
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

export const areGraphsEqual = (a: Graph) => {
  return (b: Graph) => {
    return a.id === b.id
  }
}

export const areGraphsNotEqual = (a: Graph) => {
  return (b: Graph) => {
    return !areGraphsEqual(a)(b)
  }
}

export const graphContainsNode = (node: Node) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return pipe(
      TE.right(graph),
      TE.chain((graph) => {
        return pipe(
          graph.nodes,
          RA.findFirst(nodeDomain.areNodesNotEqual(node)),
          E.fromOption(() => {
            return new Error('NodeNotFound')
          }),
          TE.fromEither,
        )
      }),
    )
  }
}

export const graphWithoutNode = (node: Node) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      nodes: pipe(
        graph.nodes,
        RA.filter(nodeDomain.areNodesEqual(node)),
      ),
    })
  }
}

export const graphWithNode = (node: Node) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      nodes: pipe(
        graph.nodes,
        RA.filter(nodeDomain.areNodesEqual(node)),
        RA.append(node),
      ),
    })
  }
}

export const graphContainsEdge = (edge: Edge) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return pipe(
      TE.right(graph),
      TE.chain((graph) => {
        return pipe(
          graph.edges,
          RA.findFirst(edgeDomain.areEdgesNotEqual(edge)),
          E.fromOption(() => {
            return new Error('EdgeNotFound')
          }),
          TE.fromEither,
        )
      }),
    )
  }
}

export const graphWithoutEdge = (edge: Edge) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter(edgeDomain.areEdgesEqual(edge)),
      ),
    })
  }
}

export const graphWithEdge = (edge: Edge) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter(edgeDomain.areEdgesEqual(edge)),
        RA.append(edge),
      ),
    })
  }
}

export const graphContainsGroup = (group: Group) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return pipe(
      TE.right(graph),
      TE.chain((graph) => {
        return pipe(
          graph.groups,
          RA.findFirst(groupDomain.areGroupsNotEqual(group)),
          E.fromOption(() => {
            return new Error('GroupNotFound')
          }),
          TE.fromEither,
        )
      }),
    )
  }
}

export const graphWithoutGroup = (group: Group) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter(groupDomain.areGroupsEqual(group)),
      ),
    })
  }
}

export const graphWithGroup = (group: Group) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter(groupDomain.areGroupsEqual(group)),
        RA.append(group),
      ),
    })
  }
}
