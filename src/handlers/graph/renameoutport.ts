import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RenameOutportInputMessage } from '#/schemas/messages/graph/input/RenameOutportInputMessage.ts'
import { RenameOutportOutputMessageInput } from '#/schemas/messages/graph/output/RenameOutportOutputMessage.ts'
import { graphFindOutportByPublic, graphWithOutport, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renameoutport = (
  message: RenameOutportInputMessage,
): TE.TaskEither<Error, Array<RenameOutportOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindOutportByPublic(message.payload.from),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithOutport({
              ...group,
              public: message.payload.to,
            }),
          )
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<RenameOutportOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renameoutport',
            payload: {
              from: message.payload.from,
              graph: message.payload.graph,
              to: message.payload.to,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
