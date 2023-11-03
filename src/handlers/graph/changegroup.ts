import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeGroupInputMessage } from '#/schemas/messages/graph/input/ChangeGroupInputMessage.ts'
import { ChangeGroupOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupOutputMessage.ts'
import { Group } from '#/schemas/messages/shared/Group.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { pipe } from 'fp-ts/function.ts'

const compareGroup = (a: Group) => {
  return (b: Group) => {
    return a.name !== b.name
  }
}

const doesGraphContainGroup = (group: Group) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return pipe(
      TE.right(graph),
      TE.chain((graph) => {
        return pipe(
          graph.groups,
          RA.findFirst(compareGroup(group)),
          E.fromOption(() => {
            return new Error('GroupNotFound')
          }),
          TE.fromEither,
        )
      }),
    )
  }
}

const updateGraphGroup = (group: Group) => {
  return (graph: Graph): TE.TaskEither<Error, Graph> => {
    return TE.right({
      ...graph,
      groups: pipe(
        graph.groups,
        RA.filter(compareGroup(group)),
      ),
    })
  }
}

export const changegroup = (
  message: ChangeGroupInputMessage,
): TE.TaskEither<Error, Array<ChangeGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  const group: Group = {
    name: message.payload.name,
    nodes: [],
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain(doesGraphContainGroup(group)),
    TE.chain(updateGraphGroup(group)),
    TE.match(
      (error): Array<ChangeGroupOutputMessageInput | ErrorOutputMessageInput> => {
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
      (graph): Array<ChangeGroupOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changegroup',
            payload: {
              graph: graph.id,
              name: group.name,
              metadata: group.metadata,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
