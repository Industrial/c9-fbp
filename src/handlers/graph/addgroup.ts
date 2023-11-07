import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddGroupInputMessage } from '#/schemas/messages/graph/input/AddGroupInputMessage.ts'
import { AddGroupOutputMessageInput } from '#/schemas/messages/graph/output/AddGroupOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphContainsAllNodesById, graphWithGroup, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addgroup = (
  message: AddGroupInputMessage,
): TE.TaskEither<Error, Array<AddGroupOutputMessageInput | ErrorOutputMessageInput>> => {
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
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<AddGroupOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addgroup',
            payload: {
              metadata: message.payload.metadata,
              name: message.payload.name,
              nodes: message.payload.nodes,
              graph: message.payload.graph,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
