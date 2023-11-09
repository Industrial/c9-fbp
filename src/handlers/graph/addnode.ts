import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddNodeGraphInputMessage } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { graphWithNode, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addnode = (
  message: AddNodeGraphInputMessage,
): TE.TaskEither<Error, Array<AddNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
      toGraphErrorGraphInput,
      (graph): Array<AddNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
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
