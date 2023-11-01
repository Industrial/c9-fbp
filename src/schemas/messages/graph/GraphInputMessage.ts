import * as S from 'schemata-ts'
import {
  AddEdgeInputMessage,
  AddEdgeInputMessageInput,
  AddEdgeInputMessageSchema,
} from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import {
  AddGroupInputMessage,
  AddGroupInputMessageInput,
  AddGroupInputMessageSchema,
} from '#/schemas/messages/graph/input/AddGroupInputMessage.ts'
import {
  AddInitialInputMessage,
  AddInitialInputMessageInput,
  AddInitialInputMessageSchema,
} from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import {
  AddInportInputMessage,
  AddInportInputMessageInput,
  AddInportInputMessageSchema,
} from '#/schemas/messages/graph/input/AddInportInputMessage.ts'
import {
  AddNodeInputMessage,
  AddNodeInputMessageInput,
  AddNodeInputMessageSchema,
} from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import {
  AddOutportInputMessage,
  AddOutportInputMessageInput,
  AddOutportInputMessageSchema,
} from '#/schemas/messages/graph/input/AddOutportInputMessage.ts'
import {
  ChangeEdgeInputMessage,
  ChangeEdgeInputMessageInput,
  ChangeEdgeInputMessageSchema,
} from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import {
  ChangeGroupInputMessage,
  ChangeGroupInputMessageInput,
  ChangeGroupInputMessageSchema,
} from '#/schemas/messages/graph/input/ChangeGroupInputMessage.ts'
import {
  ChangeNodeInputMessage,
  ChangeNodeInputMessageInput,
  ChangeNodeInputMessageSchema,
} from '#/schemas/messages/graph/input/ChangeNodeInputMessage.ts'
import {
  ClearInputMessage,
  ClearInputMessageInput,
  ClearInputMessageSchema,
} from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import {
  ErrorInputMessage,
  ErrorInputMessageInput,
  ErrorInputMessageSchema,
} from '#/schemas/messages/graph/input/ErrorInputMessage.ts'
import {
  RemoveEdgeInputMessage,
  RemoveEdgeInputMessageInput,
  RemoveEdgeInputMessageSchema,
} from '#/schemas/messages/graph/input/RemoveEdgeInputMessage.ts'
import {
  RemoveGroupInputMessage,
  RemoveGroupInputMessageInput,
  RemoveGroupInputMessageSchema,
} from '#/schemas/messages/graph/input/RemoveGroupInputMessage.ts'
import {
  RemoveInitialInputMessage,
  RemoveInitialInputMessageInput,
  RemoveInitialInputMessageSchema,
} from '#/schemas/messages/graph/input/RemoveInitialInputMessage.ts'
import {
  RemoveInportInputMessage,
  RemoveInportInputMessageInput,
  RemoveInportInputMessageSchema,
} from '#/schemas/messages/graph/input/RemoveInportInputMessage.ts'
import {
  RemoveNodeInputMessage,
  RemoveNodeInputMessageInput,
  RemoveNodeInputMessageSchema,
} from '#/schemas/messages/graph/input/RemoveNodeInputMessage.ts'
import {
  RemoveOutportInputMessage,
  RemoveOutportInputMessageInput,
  RemoveOutportInputMessageSchema,
} from '#/schemas/messages/graph/input/RemoveOutportInputMessage.ts'
import {
  RenameGroupInputMessage,
  RenameGroupInputMessageInput,
  RenameGroupInputMessageSchema,
} from '#/schemas/messages/graph/input/RenameGroupInputMessage.ts'
import {
  RenameInportInputMessage,
  RenameInportInputMessageInput,
  RenameInportInputMessageSchema,
} from '#/schemas/messages/graph/input/RenameInportInputMessage.ts'
import {
  RenameNodeInputMessage,
  RenameNodeInputMessageInput,
  RenameNodeInputMessageSchema,
} from '#/schemas/messages/graph/input/RenameNodeInputMessage.ts'
import {
  RenameOutportInputMessage,
  RenameOutportInputMessageInput,
  RenameOutportInputMessageSchema,
} from '#/schemas/messages/graph/input/RenameOutportInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type GraphInputMessageInput =
  | AddEdgeInputMessageInput
  | AddGroupInputMessageInput
  | AddInitialInputMessageInput
  | AddInportInputMessageInput
  | AddNodeInputMessageInput
  | AddOutportInputMessageInput
  | ChangeEdgeInputMessageInput
  | ChangeGroupInputMessageInput
  | ChangeNodeInputMessageInput
  | ClearInputMessageInput
  | ErrorInputMessageInput
  | RemoveEdgeInputMessageInput
  | RemoveGroupInputMessageInput
  | RemoveInitialInputMessageInput
  | RemoveInitialInputMessageInput
  | RemoveInportInputMessageInput
  | RemoveNodeInputMessageInput
  | RemoveOutportInputMessageInput
  | RenameGroupInputMessageInput
  | RenameInportInputMessageInput
  | RenameNodeInputMessageInput
  | RenameOutportInputMessageInput

export type GraphInputMessage =
  | AddEdgeInputMessage
  | AddGroupInputMessage
  | AddInitialInputMessage
  | AddInportInputMessage
  | AddNodeInputMessage
  | AddOutportInputMessage
  | ChangeEdgeInputMessage
  | ChangeGroupInputMessage
  | ChangeNodeInputMessage
  | ClearInputMessage
  | ErrorInputMessage
  | RemoveEdgeInputMessage
  | RemoveGroupInputMessage
  | RemoveInitialInputMessage
  | RemoveInportInputMessage
  | RemoveNodeInputMessage
  | RemoveOutportInputMessage
  | RenameGroupInputMessage
  | RenameInportInputMessage
  | RenameNodeInputMessage
  | RenameOutportInputMessage

export const GraphInputMessageSchema: S.Schema<GraphInputMessageInput, GraphInputMessage> = S.Union(
  AddEdgeInputMessageSchema,
  AddGroupInputMessageSchema,
  AddInitialInputMessageSchema,
  AddInportInputMessageSchema,
  AddNodeInputMessageSchema,
  AddOutportInputMessageSchema,
  ChangeEdgeInputMessageSchema,
  ChangeGroupInputMessageSchema,
  ChangeNodeInputMessageSchema,
  ClearInputMessageSchema,
  ErrorInputMessageSchema,
  RemoveEdgeInputMessageSchema,
  RemoveGroupInputMessageSchema,
  RemoveInitialInputMessageSchema,
  RemoveInportInputMessageSchema,
  RemoveNodeInputMessageSchema,
  RemoveOutportInputMessageSchema,
  RenameGroupInputMessageSchema,
  RenameInportInputMessageSchema,
  RenameNodeInputMessageSchema,
  RenameOutportInputMessageSchema,
)

export const GraphInputMessageTranscoder = deriveTranscoder(GraphInputMessageSchema)

export const GraphInputMessageInputGuard = deriveInputGuard(GraphInputMessageSchema)

export const GraphInputMessageGuard = deriveGuard(GraphInputMessageSchema)
