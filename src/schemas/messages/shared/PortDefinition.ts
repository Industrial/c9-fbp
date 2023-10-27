import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const PortValueSchema = S.Union(
  S.Ascii,
  S.Base64,
  S.Base64Url,
  S.BigIntFromString,
  S.BitcoinAddress,
  S.Boolean,
  S.BooleanFromNumber,
  S.BooleanFromString,
  S.CreditCard,
  S.Date,
  S.DateFromInt,
  S.DateFromIsoString,
  S.DateFromString,
  S.DateFromUnixTime,
  S.EmailAddress,
  S.EthereumAddress,
  S.Float,
  S.FloatFromString,
  S.HexColor,
  S.Hexadecimal,
  S.HslColor,
  S.Int,
  S.IntFromString,
  S.Jwt,
  S.LatLong,
  S.Natural,
  S.NegativeFloat,
  S.NegativeInt,
  S.NonNegativeFloat,
  S.NonPositiveFloat,
  S.NonPositiveInt,
  S.Number,
  S.PositiveFloat,
  S.PositiveInt,
  S.RGB,
  S.String,
  S.UUID,
)

export const PortDefinitionSchema = S.Struct({
  id: PortIDSchema,
  type: S.String(),
  schema: S.String(),
  required: S.Boolean,
  addressable: S.Boolean,
  description: S.String(),
  values: S.Array(PortValueSchema),
  default: PortValueSchema,
})

export type PortDefinitionInput = S.InputOf<typeof PortDefinitionSchema>

export type PortDefinition = S.OutputOf<typeof PortDefinitionSchema>

export const PortDefinitionTranscoder = deriveTranscoder(PortDefinitionSchema)
