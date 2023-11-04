import { Edge } from '#/schemas/messages/shared/Edge.ts'

export const areEdgesEqual = (a: Edge) => {
  return (b: Edge) => {
    return a.src.node === b.src.node && a.src.port === b.src.port && a.tgt.node === b.tgt.node &&
      a.tgt.port === b.tgt.port
  }
}

export const areEdgesNotEqual = (a: Edge) => {
  return (b: Edge) => {
    return !areEdgesEqual(a)(b)
  }
}
