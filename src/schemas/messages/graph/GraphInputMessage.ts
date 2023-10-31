import * as S from 'schemata-ts'
import {
  AddEdgeInputMessage,
  AddEdgeInputMessageInput,
  AddEdgeInputMessageSchema,
} from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import {
  ClearInputMessage,
  ClearInputMessageInput,
  ClearInputMessageSchema,
} from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type GraphInputMessageInput =
  | ClearInputMessageInput
  | AddEdgeInputMessageInput

export type GraphInputMessage =
  | ClearInputMessage
  | AddEdgeInputMessage

export const GraphInputMessageSchema: S.Schema<GraphInputMessageInput, GraphInputMessage> = S.Union(
  ClearInputMessageSchema,
  AddEdgeInputMessageSchema,
)

export const GraphInputMessageTranscoder = deriveTranscoder(GraphInputMessageSchema)

export const GraphInputMessageInputGuard = deriveInputGuard(GraphInputMessageSchema)

export const GraphInputMessageGuard = deriveGuard(GraphInputMessageSchema)
