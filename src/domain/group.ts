import * as Eq from 'fp-ts/Eq.ts'
import * as GroupSchema from '#/schemas/messages/shared/Group.ts'
import { NodeID } from './node.ts'

export type Group = {
  name: string
  nodes: ReadonlyArray<NodeID>
  metadata: Record<string, unknown>
}

export const create = (
  name: Group['name'],
  nodes: Group['nodes'],
  description?: Group['metadata']['description'],
): Group => {
  return {
    name,
    nodes,
    metadata: {
      description,
    },
  }
}

export const serialize = (group: Group): GroupSchema.Group => {
  const input: GroupSchema.GroupInput = {
    name: group.name,
    nodes: group.nodes,
    metadata: group.metadata.description
      ? {
        description: group.metadata.description as string,
      }
      : undefined,
  }

  return GroupSchema.GroupTranscoder.decode(input)
}

export const deserialize = (group: GroupSchema.Group) => {
  return create(
    group.name,
    group.nodes,
    group.metadata?.description,
  )
}

export const eq: Eq.Eq<Group> = Eq.fromEquals((a, b) => {
  return a.name === b.name
})
