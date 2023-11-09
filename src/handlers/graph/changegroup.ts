import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeGroupGraphInputMessage } from '#/schemas/messages/graph/input/ChangeGroupGraphInputMessage.ts'
import { ChangeGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { graphFindGroupByName, graphWithGroup, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const changegroup = (
  message: ChangeGroupGraphInputMessage,
): TE.TaskEither<Error, Array<ChangeGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindGroupByName(message.payload.name),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithGroup(group),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<ChangeGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changegroup',
            payload: {
              graph: graph.id,
              metadata: message.payload.metadata,
              name: message.payload.name,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
