import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddGroupGraphInputMessage } from '#/schemas/messages/graph/input/AddGroupGraphInputMessage.ts'
import { AddGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddGroupGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { graphContainsAllNodesById, graphWithGroup, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addgroup = (
  message: AddGroupGraphInputMessage,
): TE.TaskEither<Error, Array<AddGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsAllNodesById(message.payload.nodes)),
        E.chain(graphWithGroup({
          metadata: message.payload.metadata,
          name: message.payload.name,
          nodes: message.payload.nodes,
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
      (graph): Array<AddGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addgroup',
            payload: {
              graph: graph.id,
              metadata: message.payload.metadata,
              name: message.payload.name,
              nodes: message.payload.nodes,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
