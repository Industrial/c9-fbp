import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RenameInportInputMessage } from '#/schemas/messages/graph/input/RenameInportInputMessage.ts'
import { RenameInportOutputMessageInput } from '#/schemas/messages/graph/output/RenameInportOutputMessage.ts'
import { graphFindInportByPublic, graphWithInport, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renameinport = (
  message: RenameInportInputMessage,
): TE.TaskEither<Error, Array<RenameInportOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindInportByPublic(message.payload.from),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithInport({
              ...group,
              public: message.payload.to,
            }),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (graph): Array<RenameInportOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renameinport',
            payload: {
              graph: graph.id,
              from: message.payload.from,
              to: message.payload.to,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
