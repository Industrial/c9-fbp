import { Graph } from '#/domain1/Graph.ts'

export class Graphs {
  public graphs: Record<Graph['id'], Graph>

  public constructor() {
    this.graphs = {}
  }

  public get(k: Graph['id']) {
    return this.graphs[k]
  }

  public set(k: Graph['id'], v: Graph) {
    this.graphs[k] = v
  }

  private static instance: Graphs

  public static getInstance() {
    if (Graphs.instance) {
      return Graphs.instance
    }

    Graphs.instance = new Graphs()

    return Graphs.instance
  }
}
