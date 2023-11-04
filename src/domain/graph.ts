import * as E from 'fp-ts/Either.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as edgeDomain from '#/domain/edge.ts'
import * as groupDomain from '#/domain/group.ts'
import * as nodeDomain from '#/domain/node.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { Group } from '#/schemas/messages/shared/Group.ts'
import { Node } from '#/schemas/messages/shared/Node.ts'
import { findFirstByPredicateE, findFirstByPropertyE } from '#/helpers.ts'
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

export const graphFindNodeById = (id: Node['id']) => {
  return (graph: Graph): E.Either<Error, Node> => {
    return pipe(
      graph.nodes,
      findFirstByPropertyE('id', id),
    )
  }
}

export const graphContainsNode = (node: Node) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.nodes,
      findFirstByPredicateE(nodeDomain.areNodesNotEqual(node)),
      E.map(() => {
        return graph
      }),
    )
  }
}

export const graphWithoutNode = (node: Node) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      nodes: pipe(
        graph.nodes,
        RA.filter(nodeDomain.areNodesEqual(node)),
      ),
    })
  }
}

export const graphWithNode = (node: Node) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
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
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.edges,
      findFirstByPredicateE(edgeDomain.areEdgesNotEqual(edge)),
      E.map(() => {
        return graph
      }),
    )
  }
}

export const graphWithoutEdge = (edge: Edge) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter(edgeDomain.areEdgesEqual(edge)),
      ),
    })
  }
}

export const graphWithEdge = (edge: Edge) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter(edgeDomain.areEdgesEqual(edge)),
        RA.append(edge),
      ),
    })
  }
}

export const graphFindGroupByName = (name: Group['name']) => {
  return (graph: Graph): E.Either<Error, Group> => {
    return pipe(
      graph.groups,
      findFirstByPropertyE('name', name),
    )
  }
}

export const graphContainsGroup = (group: Group) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.groups,
      findFirstByPredicateE(groupDomain.areGroupsNotEqual(group)),
      E.map(() => {
        return graph
      }),
    )
  }
}

export const graphWithoutGroup = (group: Group) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter(groupDomain.areGroupsEqual(group)),
      ),
    })
  }
}

export const graphWithGroup = (group: Group) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter(groupDomain.areGroupsEqual(group)),
        RA.append(group),
      ),
    })
  }
}
