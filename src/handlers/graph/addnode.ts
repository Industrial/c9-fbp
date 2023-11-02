import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as spectacles from 'spectacles-ts'
import { AddNodeInputMessage } from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import { AddNodeOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { Node } from '#/schemas/messages/shared/Node.ts'

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
    TE.map((graph) => {
      return pipe(
        graph,
        // @ts-ignore: deep type
        spectacles.set(
          'nodes',
          pipe(
            graph.nodes,
            RA.filter((a) => {
              return a.id !== node.id
            }),
            RA.append(node),
          ),
        ),
      )
    }),
    TE.match(
      (error): Array<AddNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'error',
            payload: {
              message: error.message,
            },
          },
        ]
      },
      (_graph): Array<AddNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addnode',
            payload: {
              id: message.payload.id,
              component: message.payload.component,
              metadata: message.payload.metadata,
              graph: message.payload.graph,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
