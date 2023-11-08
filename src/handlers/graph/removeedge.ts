import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveEdgeInputMessage } from '#/schemas/messages/graph/input/RemoveEdgeInputMessage.ts'
import { RemoveEdgeOutputMessageInput } from '#/schemas/messages/graph/output/RemoveEdgeOutputMessage.ts'
import {
  graphContainsInportByPublic,
  graphContainsNodeById,
  graphContainsOutportByPublic,
  graphFindEdgeByTargetNode,
  graphWithoutEdge,
  toGraphErrorInput,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeedge = (
  message: RemoveEdgeInputMessage,
): TE.TaskEither<Error, Array<RemoveEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
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
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<RemoveEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeedge',
            payload: {
              graph: message.payload.graph,
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
