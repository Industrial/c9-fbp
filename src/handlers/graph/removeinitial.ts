import * as GraphDomain from '#/domain/graph.ts'
import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveInitialGraphInputMessage } from '#/schemas/messages/graph/input/RemoveInitialGraphInputMessage.ts'
import { RemoveInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInitialGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const removeinitial: MessageHandler<
  RemoveInitialGraphInputMessage,
  RemoveInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsInportByNodeIdAndPortId(message.payload.tgt.node, message.payload.tgt.port)),
        E.chain((graph) =>
          pipe(
            graph,
            GraphDomain.withoutIIPByNodeIdAndPortId(
              message.payload.tgt.node,
              message.payload.tgt.port,
            ),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      (error) => {
        send({
          protocol: 'graph',
          command: 'error',
          payload: {
            message: error.message,
          },
        })()
      },
      (graph) => {
        send({
          protocol: 'graph',
          command: 'removeinitial',
          payload: {
            graph: graph.id,
            src: message.payload.src,
            tgt: message.payload.tgt,
          },
        })()
      },
    ),
  )
