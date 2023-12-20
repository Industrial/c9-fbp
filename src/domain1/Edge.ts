import { Node } from '#/domain1/Node.ts'
import { Port } from '#/domain1/Port.ts'

export type EdgeId = `${Node['id']}:${Port['id']}/${Node['id']}:${Port['id']}`

export type PortTarget = {
  nodeId: Node['id']
  portId: Port['id']
}

export class Edge {
  #source: PortTarget

  #target: PortTarget

  #metadata: Record<string, unknown>

  public constructor(
    source: PortTarget,
    target: PortTarget,
    metadata?: Record<string, unknown>,
  ) {
    this.#source = source
    this.#target = target
    this.#metadata = metadata ?? {}
  }

  get id() {
    return Edge.createEdgeId(this.#source, this.#target)
  }

  get source() {
    return this.#source
  }

  set source(source: PortTarget) {
    this.#source = source
  }

  get target() {
    return this.#target
  }

  set target(target: PortTarget) {
    this.#target = target
  }

  get metadata() {
    return this.#metadata
  }

  set metadata(metadata: Record<string, unknown>) {
    this.#metadata = metadata
  }

  static createEdgeId(source: PortTarget, target: PortTarget): EdgeId {
    return `${source.nodeId}:${source.portId}/${target.nodeId}:${target.portId}`
  }
}
