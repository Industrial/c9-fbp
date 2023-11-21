import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as O from 'fp-ts/Option.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RemoveNodeGraphInputMessage } from '#/schemas/messages/graph/input/RemoveNodeGraphInputMessage.ts'
import { RemoveNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveNodeGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const removenode: MessageHandler<
  RemoveNodeGraphInputMessage,
  RemoveNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.id)),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyNodeAtId(message.payload.id)(() => O.none),
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
          command: 'removenode',
          payload: {
            graph: graph.id,
            id: message.payload.id,
          },
        })()
      },
    ),
  )
