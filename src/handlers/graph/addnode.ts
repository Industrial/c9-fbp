import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddNodeGraphInputMessage } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const addnode = (
  message: AddNodeGraphInputMessage,
): TE.TaskEither<Error, Array<AddNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(
          GraphDomain.withNode(
            NodeDomain.create(message.payload.id, message.payload.component, [], [], message.payload.metadata ?? {}),
          ),
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<AddNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'addnode',
          payload: {
            graph: graph.id,
            id: message.payload.id,
            component: message.payload.component,
            metadata: message.payload.metadata,
          },
        },
      ],
    ),
    TE.fromTask,
  )
