import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as traversal from '#/traversal.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RemoveGroupGraphInputMessage } from '#/schemas/messages/graph/input/RemoveGroupGraphInputMessage.ts'
import { RemoveGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveGroupGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const removegroup: MessageHandler<
  RemoveGroupGraphInputMessage,
  RemoveGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findGroupByNameE(message.payload.name)),
        E.map(() =>
          pipe(
            graph,
            pipe(
              traversal.remove,
              GraphDomain.modifyGroupAtName(message.payload.name),
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
          command: 'removegroup',
          payload: {
            graph: graph.id,
            name: message.payload.name,
          },
        })()
      },
    ),
  )
