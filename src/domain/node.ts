import { Node } from '#/schemas/messages/shared/Node.ts'

export const areNodesEqual = (a: Node) => {
  return (b: Node) => {
    return a.id === b.id
  }
}

export const areNodesNotEqual = (a: Node) => {
  return (b: Node) => {
    return !areNodesEqual(a)(b)
  }
}
