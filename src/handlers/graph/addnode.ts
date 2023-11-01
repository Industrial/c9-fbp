import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as spectacles from 'spectacles-ts'
import { AddNodeInputMessage } from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import { AddNodeOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const addnode = (
  message: AddNodeInputMessage,
): TE.TaskEither<Error, Array<AddNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  const edge: Edge = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.map((graph) => {
      return pipe(
        graph,
        // @ts-ignore: deep type
        spectacles.set(
          'nodes',
          pipe(
            graph.nodes,
            RA.filter((a) => {
              return a.src.node !== edge.src.node && a.src.port !== edge.src.port && a.tgt.node !== edge.tgt.node &&
                a.tgt.port !== edge.tgt.port
            }),
            RA.append(edge),
          ),
        ),
      )
    }),
    TE.match(
      (error): Array<AddNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'error',
            payload: {
              message: error.message,
            },
          },
        ]
      },
      (graph): Array<AddNodeOutputMessageInput | ErrorOutputMessageInput> => {
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
