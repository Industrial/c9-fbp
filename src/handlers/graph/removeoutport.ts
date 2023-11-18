import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveOutportGraphInputMessage } from '#/schemas/messages/graph/input/RemoveOutportGraphInputMessage.ts'
import { RemoveOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveOutportGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeoutport = (
  message: RemoveOutportGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsOutportByNodeIdAndPortId(message.payload.node, message.payload.public)),
        E.chain(
          GraphDomain.withoutOutportByNodeIdAndPortId(
            message.payload.node,
            message.payload.public,
          ),
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<RemoveOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'removeoutport',
          payload: {
            graph: graph.id,
            node: message.payload.node,
            public: message.payload.public,
          },
        },
      ],
    ),
    TE.fromTask,
  )
