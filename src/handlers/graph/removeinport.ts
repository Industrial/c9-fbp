import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveInportGraphInputMessage } from '#/schemas/messages/graph/input/RemoveInportGraphInputMessage.ts'
import { RemoveInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInportGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const removeinport: MessageHandler<
  RemoveInportGraphInputMessage,
  RemoveInportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsInportByNodeIdAndPortId(message.payload.node, message.payload.public)),
        E.chain(
          GraphDomain.withoutInportByNodeIdAndPortId(
            message.payload.node,
            message.payload.public,
          ),
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
          command: 'removeinport',
          payload: {
            graph: graph.id,
            node: message.payload.node,
            public: message.payload.public,
          },
        })()
      },
    ),
  )
