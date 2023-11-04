import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddNodeInputMessage } from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import { AddNodeOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import { Node } from '#/schemas/messages/shared/Node.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphWithNode, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addnode = (
  message: AddNodeInputMessage,
): TE.TaskEither<Error, Array<AddNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  const node: Node = {
    id: message.payload.id,
    component: message.payload.component,
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain(graphWithNode(node)),
    TE.match(
      toGraphErrorInput,
      (graph): Array<AddNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              id: message.payload.id,
              component: message.payload.component,
              metadata: message.payload.metadata,
              graph: graph.id,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
