import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { ValueSchema } from '#/schemas/messages/shared/Value.ts'

export const PortDefinitionSchema = S.Struct({
  id: PortIDSchema,
  type: S.String(),
  schema: S.String(),
  required: S.Boolean,
  addressable: S.Boolean,
  description: S.String(),
  values: S.Array(ValueSchema),
  default: ValueSchema,
})

export type PortDefinitionInput = S.InputOf<typeof PortDefinitionSchema>

export type PortDefinition = S.OutputOf<typeof PortDefinitionSchema>

export const PortDefinitionTranscoder = deriveTranscoder(PortDefinitionSchema)
