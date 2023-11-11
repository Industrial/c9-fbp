import * as S from 'schemata-ts'
import { GetSourceComponentInputMessageSchema } from '#/schemas/messages/component/input/GetSourceComponentInputMessage.ts'
import { ListComponentInputMessageGuard } from '#/schemas/messages/component/input/ListComponentInputMessage.ts'
import { SourceComponentInputMessageSchema } from '#/schemas/messages/component/input/SourceComponentInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ComponentInputMessageSchema = S.Union(
  GetSourceComponentInputMessageSchema,
  ListComponentInputMessageGuard,
  SourceComponentInputMessageSchema,
)

export type ComponentInputMessageInput = S.InputOf<typeof ComponentInputMessageSchema>

export type ComponentInputMessage = S.OutputOf<typeof ComponentInputMessageSchema>

export const ComponentInputMessageTranscoder = deriveTranscoder(ComponentInputMessageSchema)

export const ComponentInputMessageInputGuard = deriveInputGuard(ComponentInputMessageSchema)

export const ComponentInputMessageGuard = deriveGuard(ComponentInputMessageSchema)
