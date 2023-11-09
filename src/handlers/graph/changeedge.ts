import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeEdgeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeGraphInputMessage.ts'
import { ChangeEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import {
  graphContainsInportByPublic,
  graphContainsNodeById,
  graphContainsOutportByPublic,
  graphFindEdgeByTargetNode,
  graphWithEdge,
  toGraphErrorGraphInput,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const changeedge = (
  message: ChangeEdgeGraphInputMessage,
): TE.TaskEither<Error, Array<ChangeEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
            graphWithEdge(edge),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<ChangeEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changeedge',
            payload: {
              graph: graph.id,
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
