import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as spectacles from 'spectacles-ts'
import { ClearInputMessage } from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import { ClearOutputMessage } from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import { ErrorOutputMessage } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Handler } from '#/handlers/Handler.ts'
import { pipe } from 'fp-ts/function.ts'

export const handler: Handler<ClearInputMessage, ErrorOutputMessage, ClearOutputMessage> = (message) => {
  return pipe(
    graphs.get(message.payload.id),
    TE.map((graph) => {
      return pipe(
        graph,
        // @ts-ignore: deep type
        spectacles.set('id', graph.id),
        spectacles.set('main', graph.main),
        spectacles.set('name', graph.name),
        spectacles.set('description', graph.description),
        spectacles.set('icon', graph.icon),
        spectacles.set('library', graph.library),
        spectacles.set('nodes', []),
        spectacles.set('edges', []),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.mapLeft((error): ErrorOutputMessage => {
      return {
        protocol: 'graph',
        command: 'error',
        payload: {
          message: error.message,
        },
      }
    }),
    TE.map((graph): Array<ClearOutputMessage> => {
      return [
        {
          protocol: 'graph',
          command: 'clear',
          payload: {
            ...graph,
          },
        },
      ]
    }),
  )
}
