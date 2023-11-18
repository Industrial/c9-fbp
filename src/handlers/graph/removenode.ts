import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveNodeGraphInputMessage } from '#/schemas/messages/graph/input/RemoveNodeGraphInputMessage.ts'
import { RemoveNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveNodeGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const removenode = (
  message: RemoveNodeGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeById(message.payload.id)),
        E.chain((node) =>
          pipe(
            graph,
            GraphDomain.withoutNode(node),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<RemoveNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'removenode',
          payload: {
            graph: graph.id,
            id: message.payload.id,
          },
        },
      ],
    ),
    TE.fromTask,
  )
