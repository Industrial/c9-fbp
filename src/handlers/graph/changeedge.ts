import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeEdgeInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import { ChangeEdgeOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeOutputMessage.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import {
  graphContainsEdge,
  graphContainsNodeById,
  graphContainsOutportByPublic,
  graphWithEdge,
  toGraphErrorInput,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

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
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsNodeById(message.payload.src.node)),
        E.chain(graphContainsOutportByPublic(message.payload.src.port)),
        E.chain(graphContainsNodeById(message.payload.tgt.node)),
        E.chain(graphContainsOutportByPublic(message.payload.tgt.port)),
        E.chain(graphContainsEdge(edge)),
        E.chain(graphWithEdge(edge)),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changeedge',
            payload: {
              graph: message.payload.graph,
              src: message.payload.src,
              tgt: message.payload.tgt,
              metadata: message.payload.metadata,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
