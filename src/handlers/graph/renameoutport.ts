import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as O from 'fp-ts/Option.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RenameOutportGraphInputMessage } from '#/schemas/messages/graph/input/RenameOutportGraphInputMessage.ts'
import { RenameOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameOutportGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const renameoutport: MessageHandler<
  RenameOutportGraphInputMessage,
  RenameOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.node)),
        E.chain(NodeDomain.findOutportByIdE(message.payload.from)),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyNodeAtId(message.payload.node)(
              O.map((node) =>
                pipe(
                  node,
                  NodeDomain.modifyOutportAtId(message.payload.from)(() => O.none),
                  NodeDomain.modifyOutportAtId(message.payload.to)(O.map((port) =>
                    PortDomain.create(
                      message.payload.to,
                      message.payload.to,
                      port.metadata,
                      port.iip,
                    )
                  )),
                )
              ),
            ),
          )
        ),
        TE.fromEitherK(identity),
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
          command: 'renameoutport',
          payload: {
            graph: graph.id,
            node: message.payload.node,
            from: message.payload.from,
            to: message.payload.to,
          },
        })()
      },
    ),
  )
