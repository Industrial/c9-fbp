import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { StopNetworkInputMessage } from '#/schemas/messages/network/input/StopNetworkInputMessage.ts'
import { StoppedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StoppedNetworkOutputMessage.ts'
import { graphHasNetworkStarted, graphWithNetworkStop } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const stop = (
  message: StopNetworkInputMessage,
): TE.TaskEither<Error, Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphHasNetworkStarted()),
        E.chain(graphWithNetworkStop()),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      (error): Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => {
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
      (graph): Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => {
        return [
          {
            protocol: 'network',
            command: 'stopped',
            payload: {
              graph: graph.id,
              debug: graph.network.isDebugging,
              running: graph.network.isRunning,
              started: graph.network.hasStarted,
              time: graph.network.startTime,
              // TODO: Solve this type error with schemata-ts across the board.
              // @ts-expect-error error
              uptime: new Date().valueOf() - new Date(graph.network.startTime).valueOf(),
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}