import * as E from 'fp-ts/Either.ts'
import * as EdgeDomain from '#/domain/edge.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as O from 'fp-ts/Option.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RemoveEdgeGraphInputMessage } from '#/schemas/messages/graph/input/RemoveEdgeGraphInputMessage.ts'
import { RemoveEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveEdgeGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const removeedge: MessageHandler<
  RemoveEdgeGraphInputMessage,
  RemoveEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(() =>
          pipe(
            E.right(graph),
            E.chain(GraphDomain.findNodeByIdE(message.payload.src.node)),
            E.chain(NodeDomain.findOutportByIdE(message.payload.src.port)),
            E.map(() => graph),
          )
        ),
        E.chain(() =>
          pipe(
            E.right(graph),
            E.chain(GraphDomain.findNodeByIdE(message.payload.tgt.node)),
            E.chain(NodeDomain.findInportByIdE(message.payload.tgt.port)),
            E.map(() => graph),
          )
        ),
        E.chain(GraphDomain.findEdgeByEdgeIdE(EdgeDomain.createEdgeId({
          nodeId: message.payload.src.node,
          portId: message.payload.src.port,
        }, {
          nodeId: message.payload.tgt.node,
          portId: message.payload.tgt.port,
        }))),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyEdgeAtEdgeId(
              EdgeDomain.createEdgeId({
                nodeId: message.payload.src.node,
                portId: message.payload.src.port,
              }, {
                nodeId: message.payload.tgt.node,
                portId: message.payload.tgt.port,
              }),
            )(() => O.none),
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
          command: 'removeedge',
          payload: {
            graph: graph.id,
            src: message.payload.src,
            tgt: message.payload.tgt,
          },
        })()
      },
    ),
  )
