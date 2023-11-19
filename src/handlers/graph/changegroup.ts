import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeGroupGraphInputMessage } from '#/schemas/messages/graph/input/ChangeGroupGraphInputMessage.ts'
import { ChangeGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const changegroup: MessageHandler<
  ChangeGroupGraphInputMessage,
  ChangeGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findGroupByName(message.payload.name)),
        E.chain((group) =>
          pipe(
            graph,
            GraphDomain.withGroup(group),
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
          command: 'changegroup',
          payload: {
            graph: graph.id,
            metadata: message.payload.metadata,
            name: message.payload.name,
          },
        })()
      },
    ),
  )
