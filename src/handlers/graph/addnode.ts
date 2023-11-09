import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddNodeInputMessage } from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import { AddNodeOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphWithNode, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addnode = (
  message: AddNodeInputMessage,
): TE.TaskEither<Error, Array<AddNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        TE.fromEitherK(graphWithNode({
          id: message.payload.id,
          component: message.payload.component,
          metadata: message.payload.metadata ?? {},
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (graph): Array<AddNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              graph: graph.id,
              id: message.payload.id,
              component: message.payload.component,
              metadata: message.payload.metadata,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
