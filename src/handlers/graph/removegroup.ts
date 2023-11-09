import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveGroupGraphInputMessage } from '#/schemas/messages/graph/input/RemoveGroupGraphInputMessage.ts'
import { RemoveGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveGroupGraphOutputMessage.ts'
import { graphFindGroupByName, graphWithoutGroup, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removegroup = (
  message: RemoveGroupGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindGroupByName(message.payload.name),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithoutGroup(group),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RemoveGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removegroup',
            payload: {
              graph: graph.id,
              name: message.payload.name,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
