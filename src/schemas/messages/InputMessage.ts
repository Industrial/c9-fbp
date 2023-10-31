import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeInputMessage,
  RuntimeInputMessageInput,
  RuntimeInputMessageSchema,
} from '#/schemas/messages/runtime/RuntimeInputMessage.ts'
import {
  GraphInputMessage,
  GraphInputMessageInput,
  GraphInputMessageSchema,
} from '#/schemas/messages/graph/GraphInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'

export const InputMessageSchema = S.Union(
  GraphInputMessageSchema,
  RuntimeInputMessageSchema,
)

export type InputMessageInput =
  | GraphInputMessageInput
  | RuntimeInputMessageInput

export type InputMessage =
  | GraphInputMessage
  | RuntimeInputMessage

export const InputMessageTranscoder = deriveTranscoder<InputMessageInput, InputMessage>(InputMessageSchema)

export const InputMessageInputGuard = deriveInputGuard(InputMessageSchema)

export const InputMessageGuard = deriveGuard(InputMessageSchema)
