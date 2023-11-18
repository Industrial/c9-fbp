import * as E from 'fp-ts/Either.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortDomain from '#/domain/port.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameOutportGraphInputMessage } from '#/schemas/messages/graph/input/RenameOutportGraphInputMessage.ts'
import { RenameOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameOutportGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const renameoutport = (
  message: RenameOutportGraphInputMessage,
): TE.TaskEither<Error, Array<RenameOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeById(message.payload.node)),
        E.chain((node) =>
          pipe(
            E.right(node),
            E.chain(NodeDomain.findOutportById(message.payload.from)),
            E.chain((port) =>
              pipe(
                E.right(node),
                E.chain(NodeDomain.withoutOutport(port)),
                E.chain(NodeDomain.withOutport(PortDomain.create(
                  message.payload.to,
                  message.payload.to,
                  port.metadata,
                  port.iip,
                ))),
              )
            ),
            E.map(() => graph),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<RenameOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'renameoutport',
          payload: {
            graph: graph.id,
            node: message.payload.node,
            from: message.payload.from,
            to: message.payload.to,
          },
        },
      ],
    ),
    TE.fromTask,
  )
