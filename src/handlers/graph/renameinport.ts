import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as O from 'fp-ts/Option.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RenameInportGraphInputMessage } from '#/schemas/messages/graph/input/RenameInportGraphInputMessage.ts'
import { RenameInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameInportGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const renameinport: MessageHandler<
  RenameInportGraphInputMessage,
  RenameInportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.node)),
        E.chain(NodeDomain.findInportByIdE(message.payload.from)),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyNodeAtId(message.payload.node)(
              O.map((node) =>
                pipe(
                  node,
                  NodeDomain.modifyInportAtId(message.payload.from)(() => O.none),
                  NodeDomain.modifyInportAtId(message.payload.to)(O.map((port) =>
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
          command: 'renameinport',
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
