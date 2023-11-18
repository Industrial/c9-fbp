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
): Group => ({
  name,
  nodes,
  metadata: {
    description,
  },
})

export const serialize = (group: Group): GroupSchema.Group =>
  GroupSchema.GroupTranscoder.decode({
    name: group.name,
    nodes: group.nodes,
    metadata: group.metadata.description
      ? {
        description: group.metadata.description as string,
      }
      : undefined,
  })

export const deserialize = (group: GroupSchema.Group) =>
  create(
    group.name,
    group.nodes,
    group.metadata?.description,
  )

export const eq: Eq.Eq<Group> = Eq.fromEquals((a, b) => a.name === b.name)
