import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddEdgeInputMessage } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddEdgeOutputMessageInput } from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import {
  graphContainsInportByPublic,
  graphContainsNodeById,
  graphContainsOutportByPublic,
  graphWithEdge,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addedge = (
  message: AddEdgeInputMessage,
): TE.TaskEither<Error, Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsNodeById(message.payload.src.node)),
        E.chain(graphContainsOutportByPublic(message.payload.src.port)),
        E.chain(graphContainsNodeById(message.payload.tgt.node)),
        E.chain(graphContainsInportByPublic(message.payload.tgt.port)),
        E.chain(graphWithEdge({
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        })),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      // toGraphErrorInput,
      (error): Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput> => {
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
      (_graph): Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addedge',
            payload: {
              graph: message.payload.graph,
              metadata: message.payload.metadata,
              src: message.payload.src,
              tgt: message.payload.tgt,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
