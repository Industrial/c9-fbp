import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveGroupInputMessage } from '#/schemas/messages/graph/input/RemoveGroupInputMessage.ts'
import { RemoveGroupOutputMessageInput } from '#/schemas/messages/graph/output/RemoveGroupOutputMessage.ts'
import { graphFindGroupByName, graphWithoutGroup, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removegroup = (
  message: RemoveGroupInputMessage,
): TE.TaskEither<Error, Array<RemoveGroupOutputMessageInput | ErrorOutputMessageInput>> => {
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
      toGraphErrorInput,
      (graph): Array<RemoveGroupOutputMessageInput | ErrorOutputMessageInput> => {
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
