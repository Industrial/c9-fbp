import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddEdgeGraphInputMessage } from '#/schemas/messages/graph/input/AddEdgeGraphInputMessage.ts'
import { AddEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddEdgeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import {
  graphContainsInportByPublic,
  graphContainsNodeById,
  graphContainsOutportByPublic,
  graphWithEdge,
  toGraphErrorGraphInput,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addedge = (
  message: AddEdgeGraphInputMessage,
): TE.TaskEither<Error, Array<AddEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<AddEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addedge',
            payload: {
              graph: graph.id,
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
