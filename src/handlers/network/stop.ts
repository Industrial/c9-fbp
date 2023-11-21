import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { Float } from 'schemata-ts/float'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { StopNetworkInputMessage } from '#/schemas/messages/network/input/StopNetworkInputMessage.ts'
import { StoppedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StoppedNetworkOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const stop: MessageHandler<
  StopNetworkInputMessage,
  StoppedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.hasNetworkStartedE),
        E.map((graph) =>
          pipe(
            graph,
            GraphDomain.stopNetwork,
          )
        ),
        TE.fromEitherK(identity),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      (error) => {
        send({
          protocol: 'network',
          command: 'error',
          payload: {
            graph: message.payload.graph,
            message: error.message,
            stack: undefined,
          },
        })()
      },
      (graph) => {
        send({
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
        })()
      },
    ),
  )
