import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddEdgeInputMessage } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddEdgeOutputMessageInput } from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphWithEdge, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addedge = (
  message: AddEdgeInputMessage,
): TE.TaskEither<Error, Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        TE.fromEitherK(graphWithEdge({
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addedge',
            payload: {
              graph: message.payload.graph,
              metadata: message.payload.metadata,
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
