import * as S from 'schemata-ts'
import { ComponentInputMessageSchema } from '#/schemas/messages/component/ComponentInputMessage.ts'
import { GraphInputMessageSchema } from '#/schemas/messages/graph/GraphInputMessage.ts'
import { RuntimeInputMessageSchema } from '#/schemas/messages/runtime/RuntimeInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const InputMessageSchema = S.Union(
  ComponentInputMessageSchema,
  GraphInputMessageSchema,
  RuntimeInputMessageSchema,
)

export type InputMessageInput = S.InputOf<typeof InputMessageSchema>

export type InputMessage = S.OutputOf<typeof InputMessageSchema>

export const InputMessageTranscoder = deriveTranscoder(InputMessageSchema)

export const InputMessageInputGuard = deriveInputGuard(InputMessageSchema)

export const InputMessageGuard = deriveGuard(InputMessageSchema)
