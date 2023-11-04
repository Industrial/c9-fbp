import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeGroupInputMessage } from '#/schemas/messages/graph/input/ChangeGroupInputMessage.ts'
import { ChangeGroupOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphFindGroupByName, graphWithGroup, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const changegroup = (
  message: ChangeGroupInputMessage,
): TE.TaskEither<Error, Array<ChangeGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindGroupByName(message.payload.name),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithGroup(group),
          )
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<ChangeGroupOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changegroup',
            payload: {
              graph: message.payload.graph,
              metadata: message.payload.metadata,
              name: message.payload.name,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
