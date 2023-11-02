import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeEdgeInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import { ChangeEdgeOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeOutputMessage.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { pipe } from 'fp-ts/function.ts'

const compareEdge = (a: Edge) => {
  return (b: Edge) => {
    return a.src.node !== b.src.node && a.src.port !== b.src.port && a.tgt.node !== b.tgt.node &&
      a.tgt.port !== b.tgt.port
  }
}

const doesGraphContainEdge = (edge: Edge) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return pipe(
      TE.right(graph),
      TE.chain((graph) => {
        return pipe(
          graph.edges,
          RA.findFirst(compareEdge(edge)),
          E.fromOption(() => {
            return new Error('EdgeNotFound')
          }),
          TE.fromEither,
        )
      }),
    )
  }
}

const updateGraphEdge = (edge: Edge) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      edges: pipe(
        graph.edges,
        RA.filter(compareEdge(edge)),
      ),
    })
  }
}

export const changeedge = (
  message: ChangeEdgeInputMessage,
): TE.TaskEither<Error, Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  const edge: Edge = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain(doesGraphContainEdge(edge)),
    TE.chain(updateGraphEdge(edge)),
    TE.match(
      (error): Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'error',
            payload: {
              message: error.message,
            },
          },
        ]
      },
      (graph): Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changeedge',
            payload: {
              graph: graph.id,
              metadata: edge.metadata,
              src: edge.src,
              tgt: edge.tgt,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
