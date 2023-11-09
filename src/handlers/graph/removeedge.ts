import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveEdgeGraphInputMessage } from '#/schemas/messages/graph/input/RemoveEdgeGraphInputMessage.ts'
import { RemoveEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveEdgeGraphOutputMessage.ts'
import {
  graphContainsInportByPublic,
  graphContainsNodeById,
  graphContainsOutportByPublic,
  graphFindEdgeByTargetNode,
  graphWithoutEdge,
  toGraphErrorGraphInput,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeedge = (
  message: RemoveEdgeGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsNodeById(message.payload.src.node)),
        E.chain(graphContainsOutportByPublic(message.payload.src.port)),
        E.chain(graphContainsNodeById(message.payload.tgt.node)),
        E.chain(graphContainsInportByPublic(message.payload.tgt.port)),
        E.chain(graphFindEdgeByTargetNode(message.payload.src, message.payload.tgt)),
        TE.fromEitherK(E.chain((edge) => {
          return pipe(
            graph,
            graphWithoutEdge(edge),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RemoveEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeedge',
            payload: {
              graph: graph.id,
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
