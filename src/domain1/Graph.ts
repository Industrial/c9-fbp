import { Edge } from '#/domain1/Edge.ts'
import { Group } from '#/domain1/Group.ts'
import { Node } from '#/domain1/Node.ts'

export type GraphNetwork = {
  isDebugging: boolean
  isRunning: boolean
  hasStarted: boolean
  startTime: string
}

export class Graph {
  #id: string

  #main: boolean

  #name: string

  #nodes: Record<Node['id'], Node>

  #edges: Record<Edge['id'], Edge>

  #groups: Record<Group['name'], Group>

  #library?: string

  #description?: string

  #icon?: string

  #network: GraphNetwork

  public constructor(
    id: string,
    main: boolean,
    name: string,
    nodes: Record<Node['id'], Node>,
    edges: Record<Edge['id'], Edge>,
    groups: Record<Group['name'], Group>,
    library?: string,
    description?: string,
    icon?: string,
  ) {
    this.#id = id
    this.#name = name
    this.#nodes = nodes
    this.#edges = edges
    this.#groups = groups
    this.#main = main
    this.#library = library
    this.#description = description
    this.#icon = icon
    this.#network = {
      isDebugging: false,
      isRunning: false,
      hasStarted: false,
      startTime: new Date().toISOString(),
    }
  }

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get main() {
    return this.#main
  }

  set main(main: boolean) {
    this.#main = main
  }

  get name() {
    return this.#name
  }

  set name(name: string) {
    this.#name = name
  }

  get nodes() {
    return this.#nodes
  }

  public addNode(node: Node) {
    this.#nodes[node.id] = node
  }

  public removeNode(node: Node) {
    delete this.#nodes[node.id]
  }

  get edges() {
    return this.#edges
  }

  public addEdge(edge: Edge) {
    this.#edges[edge.id] = edge
  }

  public removeEdge(edge: Edge) {
    delete this.#edges[edge.id]
  }

  get groups() {
    return this.#groups
  }

  public addGroup(group: Group) {
    this.#groups[group.name] = group
  }

  public removeGroup(group: Group) {
    delete this.#groups[group.name]
  }

  get library() {
    return this.#library
  }

  set library(library: string | undefined) {
    this.#library = library
  }

  get description() {
    return this.#description
  }

  set description(description: string | undefined) {
    this.#description = description
  }

  get icon() {
    return this.#icon
  }

  set icon(icon: string | undefined) {
    this.#icon = icon
  }

  get network() {
    return this.#network
  }

  set network(network: GraphNetwork) {
    this.#network = network
  }

  public hasAllNodesById(nodes: ReadonlyArray<Node['id']>): boolean {
    return nodes.some(Object.values(this.nodes).map((a) => a.id).includes)
  }
}
