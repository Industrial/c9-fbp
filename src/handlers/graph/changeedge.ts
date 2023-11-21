import * as E from 'fp-ts/Either.ts'
import * as EdgeDomain from '#/domain/edge.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as O from 'fp-ts/Option.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeEdgeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeGraphInputMessage.ts'
import { ChangeEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const changeedge: MessageHandler<
  ChangeEdgeGraphInputMessage,
  ChangeEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
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
            )(O.map(() =>
              EdgeDomain.create(
                message.payload.src.node,
                message.payload.src.port,
                message.payload.tgt.node,
                message.payload.tgt.port,
                message.payload.metadata ?? {},
              )
            )),
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
          command: 'changeedge',
          payload: {
            graph: graph.id,
            src: message.payload.src,
            tgt: message.payload.tgt,
            metadata: message.payload.metadata,
          },
        })()
      },
    ),
  )
