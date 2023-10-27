import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const TimeframeSchema = S.Union([
  S.Literal('1m'),
  S.Literal('3m'),
  S.Literal('5m'),
  S.Literal('15m'),
  S.Literal('30m'),
  S.Literal('1h'),
  S.Literal('2h'),
  S.Literal('4h'),
  S.Literal('6h'),
  S.Literal('8h'),
  S.Literal('12h'),
  S.Literal('1d'),
])

export type TimeframeInput = S.InputOf<typeof TimeframeSchema>

export type Timeframe = S.OutputOf<typeof TimeframeSchema>

export const TimeframeValueTranscoder = deriveTranscoder<TimeframeInput, Timeframe>(TimeframeSchema)
