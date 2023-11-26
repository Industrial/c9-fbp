import { Node } from '#/domain1/Node.ts'

export class Group {
  #name: string

  #nodeIds: Array<Node['id']>

  #metadata: Record<string, unknown>

  public constructor(
    name: string,
    nodes: Array<Node['id']>,
    metadata?: Record<string, unknown>,
  ) {
    this.#name = name
    this.#nodeIds = nodes
    this.#metadata = metadata ?? {}
  }

  public setName(name: Group['name']): void {
    this.name = name
  }

  public setNodes(nodes: Group['nodeIds']): void {
    this.nodeIds = nodes
  }

  get name() {
    return this.#name
  }

  set name(name: string) {
    this.#name = name
  }

  get nodeIds() {
    return this.#nodeIds
  }

  set nodeIds(nodeIds: Array<Node['id']>) {
    this.#nodeIds = nodeIds
  }

  get metadata() {
    return this.#metadata
  }

  set metadata(metadata: Record<string, unknown>) {
    this.#metadata = metadata
  }
}
