import * as Eq from 'fp-ts/Eq.ts'
import * as equals from '#/equals.ts'

export type IIP = {
  data: unknown
  metadata: Record<string, unknown>
}

export const create = (
  data: IIP['data'],
  metadata: IIP['metadata'],
): IIP => ({
  data,
  metadata,
})

export const eq: Eq.Eq<IIP> = Eq.fromEquals(equals.byProperty('data'))
