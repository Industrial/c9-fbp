import { Port } from '#/schemas/messages/shared/Port.ts'

export const arePortsEqual = (a: Port) => {
  return (b: Port) => {
    return a.node === b.node && a.port === b.port
  }
}

export const arePortsNotEqual = (a: Port) => {
  return (b: Port) => {
    return !arePortsEqual(a)(b)
  }
}
