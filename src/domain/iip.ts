import { IIP } from '#/schemas/messages/shared/IIP.ts'

export const areIIPsEqual = (a: IIP) => {
  return (b: IIP) => {
    return a.tgt.node === b.tgt.node && a.tgt.port === b.tgt.port
  }
}

export const areIIPsNotEqual = (a: IIP) => {
  return (b: IIP) => {
    return !areIIPsEqual(a)(b)
  }
}
