import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as GroupDomain from '#/domain/group.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameGroupGraphInputMessage } from '#/schemas/messages/graph/input/RenameGroupGraphInputMessage.ts'
import { RenameGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameGroupGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const renamegroup = (
  message: RenameGroupGraphInputMessage,
): TE.TaskEither<Error, Array<RenameGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findGroupByName(message.payload.from)),
        E.chain((group) =>
          pipe(
            E.right(graph),
            E.chain(GraphDomain.withoutGroup(group)),
            E.chain(
              GraphDomain.withGroup(GroupDomain.create(message.payload.to, group.nodes, group.metadata.description)),
            ),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<RenameGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'renamegroup',
          payload: {
            graph: graph.id,
            from: message.payload.from,
            to: message.payload.to,
          },
        },
      ],
    ),
    TE.fromTask,
  )
