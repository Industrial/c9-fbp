import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddEdgeInputMessage } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddEdgeOutputMessageInput } from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphWithEdge, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addedge = (
  message: AddEdgeInputMessage,
): TE.TaskEither<Error, Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  const edge: Edge = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain(graphWithEdge(edge)),
    TE.match(
      toGraphErrorInput,
      (graph): Array<AddEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addedge',
            payload: {
              graph: graph.id,
              metadata: edge.metadata,
              src: edge.src,
              tgt: edge.tgt,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
