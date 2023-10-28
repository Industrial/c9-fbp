import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray.ts'
import * as S from 'schemata-ts'

export type PacketEventInput = 'connect' | 'begingroup' | 'data' | 'endgroup' | 'disconnect'

export type PacketEvent = 'connect' | 'begingroup' | 'data' | 'endgroup' | 'disconnect'

export const PacketEventSchema: S.Schema<PacketEventInput, PacketEvent> = S.Union(
  S.Literal<ReadonlyNonEmptyArray<PacketEventInput>>(
    'connect',
    'begingroup',
    'data',
    'endgroup',
    'disconnect',
  ),
)
