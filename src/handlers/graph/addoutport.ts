import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddOutportGraphInputMessage } from '#/schemas/messages/graph/input/AddOutportGraphInputMessage.ts'
import { AddOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddOutportGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const addoutport = (
  message: AddOutportGraphInputMessage,
): TE.TaskEither<Error, Array<AddOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsNodeById(message.payload.node)),
        E.chain(
          GraphDomain.withInportByNodeId(
            PortDomain.create(message.payload.port, message.payload.public, message.payload.metadata ?? {}),
            message.payload.node,
          ),
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<AddOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'addoutport',
          payload: {
            graph: graph.id,
            metadata: message.payload.metadata,
            public: message.payload.public,
            node: message.payload.node,
            port: message.payload.port,
          },
        },
      ],
    ),
    TE.fromTask,
  )
