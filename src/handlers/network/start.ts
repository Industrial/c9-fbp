import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { StartNetworkInputMessage } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import { StartedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'
import { graphWithNetworkStart } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const start = (
  message: StartNetworkInputMessage,
): TE.TaskEither<Error, Array<StartedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphWithNetworkStart()),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      (error): Array<StartedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => {
        return [
          {
            protocol: 'network',
            command: 'error',
            payload: {
              graph: message.payload.graph,
              message: error.message,
              stack: undefined,
            },
          },
        ]
      },
      (graph): Array<StartedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => {
        return [
          {
            protocol: 'network',
            command: 'started',
            payload: {
              graph: graph.id,
              debug: graph.network.isDebugging,
              running: graph.network.isRunning,
              started: graph.network.hasStarted,
              time: graph.network.startTime,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
