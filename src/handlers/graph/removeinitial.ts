import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as traversal from '#/traversal.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RemoveInitialGraphInputMessage } from '#/schemas/messages/graph/input/RemoveInitialGraphInputMessage.ts'
import { RemoveInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInitialGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const removeinitial: MessageHandler<
  RemoveInitialGraphInputMessage,
  RemoveInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.tgt.node)),
        E.chain(NodeDomain.findInportByIdE(message.payload.tgt.port)),
        E.map(() =>
          pipe(
            graph,
            pipe(
              PortDomain.modifyIIP(traversal.remove),
              traversal.map,
              NodeDomain.modifyInportAtId(message.payload.tgt.port),
              traversal.map,
              GraphDomain.modifyNodeAtId(message.payload.tgt.node),
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
