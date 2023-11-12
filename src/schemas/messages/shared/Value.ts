import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ValueSchema = S.Union(
  S.UnknownRecord,
  S.UnknownArray,
  S.String(),
  S.Number,
  S.Int(),
  S.Boolean,
  // S.Ascii,
  // S.Base64,
  // S.Base64Url,
  // S.BigIntFromString,
  // S.BitcoinAddress,
  // S.Boolean,
  // S.BooleanFromNumber,
  // S.BooleanFromString,
  // S.CreditCard,
  // S.Date(),
  // S.DateFromInt,
  // S.DateFromIsoString(),
  // S.DateFromString(),
  // S.DateFromUnixTime,
  // S.EmailAddress,
  // S.EthereumAddress,
  // S.Float(),
  // S.FloatFromString,
  // S.HexColor,
  // S.Hexadecimal,
  // S.HslColor,
  // S.Int(),
  // S.IntFromString,
  // S.Jwt,
  // S.LatLong,
  // S.Natural,
  // S.NegativeFloat,
  // S.NegativeInt,
  // S.NonNegativeFloat,
  // S.NonPositiveFloat,
  // S.NonPositiveInt,
  // S.Number,
  // S.PositiveFloat,
  // S.PositiveInt,
  // S.RGB,
  // S.String(),
  // S.UUID(5),
)

export type ValueInput = S.InputOf<typeof ValueSchema>

export type Value = S.OutputOf<typeof ValueSchema>

export const ValueTranscoder = deriveTranscoder(ValueSchema)

export const ValueInputGuard = deriveInputGuard(ValueSchema)

export const ValueGuard = deriveGuard(ValueSchema)
