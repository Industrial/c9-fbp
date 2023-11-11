import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageSchema } from '#/schemas/messages/runtime/RuntimeInputMessage.ts'
import { GraphInputMessageSchema } from '#/schemas/messages/graph/GraphInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'

export const InputMessageSchema = S.Union(
  GraphInputMessageSchema,
  RuntimeInputMessageSchema,
)

export type InputMessageInput = S.InputOf<typeof InputMessageSchema>

export type InputMessage = S.OutputOf<typeof InputMessageSchema>

export const InputMessageTranscoder = deriveTranscoder(InputMessageSchema)

export const InputMessageInputGuard = deriveInputGuard(InputMessageSchema)

export const InputMessageGuard = deriveGuard(InputMessageSchema)
