import * as Eq from 'fp-ts/Eq.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as equals from '#/equals.ts'

export type Group = {
  name: string
  nodes: ReadonlyArray<NodeDomain.Node['id']>
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

export const eq: Eq.Eq<Group> = Eq.fromEquals(equals.byProperty('name'))
