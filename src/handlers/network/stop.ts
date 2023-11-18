import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { Float } from 'schemata-ts/float'
import { StopNetworkInputMessage } from '#/schemas/messages/network/input/StopNetworkInputMessage.ts'
import { StoppedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StoppedNetworkOutputMessage.ts'
import { hasNetworkStarted, withNetworkStop } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const stop = (
  message: StopNetworkInputMessage,
): TE.TaskEither<Error, Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(hasNetworkStarted()),
        E.chain(withNetworkStop()),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      (error): Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => [
        {
          protocol: 'network',
          command: 'error',
          payload: {
            graph: message.payload.graph,
            message: error.message,
            stack: undefined,
          },
        },
      ],
      (graph): Array<StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => [
        {
          protocol: 'network',
          command: 'stopped',
          payload: {
            graph: graph.id,
            debug: graph.network.isDebugging,
            running: graph.network.isRunning,
            started: graph.network.hasStarted,
            time: graph.network.startTime,
            uptime: (new Date().valueOf() - new Date(graph.network.startTime).valueOf() as Float),
          },
        },
      ],
    ),
    TE.fromTask,
  )
