import * as E from 'fp-ts/Either.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as S from 'fp-ts/string.ts'
import * as edgeDomain from '#/domain/edge.ts'
import * as groupDomain from '#/domain/group.ts'
import * as iipDomain from '#/domain/iip.ts'
import * as nodeDomain from '#/domain/node.ts'
import * as portDomain from '#/domain/port.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { Group } from '#/schemas/messages/shared/Group.ts'
import { IIP } from '#/schemas/messages/shared/IIP.ts'
import { Node } from '#/schemas/messages/shared/Node.ts'
import { Port } from '#/schemas/messages/shared/Port.ts'
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
      E.mapLeft(() => {
        return new Error('NodeNotFound')
      }),
    )
  }
}

export const graphContainsNodeById = (id: Node['id']) => {
  return (graph: Graph): E.Either<Error, Graph> => {
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

export const graphContainsAllNodesById = (ids: ReadonlyArray<Node['id']>) => {
  return (graph: Graph): E.Either<Error, Graph> => {
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

export const graphContainsNode = (node: Node) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.nodes,
      findFirstByPredicateE(nodeDomain.areNodesNotEqual(node)),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('NodeNotFound')
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
        RA.filter(nodeDomain.areNodesNotEqual(node)),
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
        RA.filter(nodeDomain.areNodesNotEqual(node)),
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
      E.mapLeft(() => {
        return new Error('EdgeNotFound')
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
        RA.filter(edgeDomain.areEdgesNotEqual(edge)),
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
        RA.filter(edgeDomain.areEdgesNotEqual(edge)),
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
      E.mapLeft(() => {
        return new Error('GroupNotFound')
      }),
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
      E.mapLeft(() => {
        return new Error('GroupNotFound')
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
        RA.filter(groupDomain.areGroupsNotEqual(group)),
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
        RA.filter(groupDomain.areGroupsNotEqual(group)),
        RA.append(group),
      ),
    })
  }
}

export const graphContainsIIP = (iip: IIP) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.iips,
      findFirstByPredicateE(iipDomain.areIIPsNotEqual(iip)),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('IIPNotFound')
      }),
    )
  }
}

export const graphWithoutIIP = (iip: IIP) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      iips: pipe(
        graph.iips,
        RA.filter(iipDomain.areIIPsNotEqual(iip)),
      ),
    })
  }
}

export const graphWithIIP = (iip: IIP) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return E.right({
      ...graph,
      iips: pipe(
        graph.iips,
        RA.filter(iipDomain.areIIPsNotEqual(iip)),
        RA.append(iip),
      ),
    })
  }
}

export const graphFindInportByPublic = (name: Port['public']) => {
  return (graph: Graph): E.Either<Error, Port> => {
    return pipe(
      graph.inports,
      findFirstByPropertyE('public', name),
      E.mapLeft(() => {
        return new Error('InportNotFound')
      }),
    )
  }
}

export const graphContainsInportByPublic = (name: Port['public']) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.inports,
      findFirstByPropertyE('public', name),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('InportNotFound')
      }),
    )
  }
}

export const graphContainsInport = (port: Port) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.inports,
      findFirstByPredicateE(portDomain.arePortsNotEqual(port)),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('InportNotFound')
      }),
    )
  }
}

export const graphWithoutInport = (port: Port) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    const newGraph: Graph = {
      ...graph,
      inports: pipe(
        graph.inports,
        RA.filter(portDomain.arePortsNotEqual(port)),
      ),
    }

    return E.right(newGraph)
  }
}

export const graphWithInport = (port: Port) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    const newGraph: Graph = {
      ...graph,
      inports: pipe(
        graph.inports,
        RA.filter(portDomain.arePortsNotEqual(port)),
        RA.append(port),
      ),
    }

    return E.right(newGraph)
  }
}

export const graphFindOutportByPublic = (name: Port['public']) => {
  return (graph: Graph): E.Either<Error, Port> => {
    return pipe(
      graph.outports,
      findFirstByPropertyE('public', name),
      E.mapLeft(() => {
        return new Error('OutportNotFound')
      }),
    )
  }
}

export const graphContainsOutportByPublic = (name: Port['public']) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.outports,
      findFirstByPropertyE('public', name),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('OutportNotFound')
      }),
    )
  }
}

export const graphContainsOutport = (port: Port) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    return pipe(
      graph.outports,
      findFirstByPredicateE(portDomain.arePortsNotEqual(port)),
      E.map(() => {
        return graph
      }),
      E.mapLeft(() => {
        return new Error('OutportNotFound')
      }),
    )
  }
}

export const graphWithoutOutport = (port: Port) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    const newGraph: Graph = {
      ...graph,
      outports: pipe(
        graph.outports,
        RA.filter(portDomain.arePortsNotEqual(port)),
      ),
    }

    return E.right(newGraph)
  }
}

export const graphWithOutport = (port: Port) => {
  return (graph: Graph): E.Either<Error, Graph> => {
    const newGraph: Graph = {
      ...graph,
      outports: pipe(
        graph.outports,
        RA.filter(portDomain.arePortsNotEqual(port)),
        RA.append(port),
      ),
    }

    return E.right(newGraph)
  }
}
