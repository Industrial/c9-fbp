import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveEdgeInputMessage } from '#/schemas/messages/graph/input/RemoveEdgeInputMessage.ts'
import { RemoveEdgeOutputMessageInput } from '#/schemas/messages/graph/output/RemoveEdgeOutputMessage.ts'
import { graphContainsEdge, graphWithoutEdge, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeedge = (
  message: RemoveEdgeInputMessage,
): TE.TaskEither<Error, Array<RemoveEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  const edge: Edge = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: {
      route: undefined,
      schema: undefined,
      secure: undefined,
    },
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain(graphContainsEdge(edge)),
    TE.chain(graphWithoutEdge(edge)),
    TE.match(
      toGraphErrorInput,
      (graph): Array<RemoveEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeedge',
            payload: {
              graph: graph.id,
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
