import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeEdgeInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import { ChangeEdgeOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeOutputMessage.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphContainsEdge, graphWithEdge, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const changeedge = (
  message: ChangeEdgeInputMessage,
): TE.TaskEither<Error, Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput>> => {
  const edge: Edge = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain(graphContainsEdge(edge)),
    TE.chain(graphWithEdge(edge)),
    TE.match(
      toGraphErrorInput,
      (graph): Array<ChangeEdgeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changeedge',
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
