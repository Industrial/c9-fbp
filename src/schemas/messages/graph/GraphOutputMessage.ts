import * as S from 'schemata-ts'
import {
  AddEdgeOutputMessage,
  AddEdgeOutputMessageInput,
  AddEdgeOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import {
  AddGroupOutputMessage,
  AddGroupOutputMessageInput,
  AddGroupOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddGroupOutputMessage.ts'
import {
  AddInitialOutputMessage,
  AddInitialOutputMessageInput,
  AddInitialOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddInitialOutputMessage.ts'
import {
  AddInportOutputMessage,
  AddInportOutputMessageInput,
  AddInportOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddInportOutputMessage.ts'
import {
  AddNodeOutputMessage,
  AddNodeOutputMessageInput,
  AddNodeOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import {
  AddOutportOutputMessage,
  AddOutportOutputMessageInput,
  AddOutportOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddOutportOutputMessage.ts'
import {
  ChangeEdgeOutputMessage,
  ChangeEdgeOutputMessageInput,
  ChangeEdgeOutputMessageSchema,
} from '#/schemas/messages/graph/output/ChangeEdgeOutputMessage.ts'
import {
  ChangeGroupOutputMessage,
  ChangeGroupOutputMessageInput,
  ChangeGroupOutputMessageSchema,
} from '#/schemas/messages/graph/output/ChangeGroupOutputMessage.ts'
import {
  ChangeNodeOutputMessage,
  ChangeNodeOutputMessageInput,
  ChangeNodeOutputMessageSchema,
} from '#/schemas/messages/graph/output/ChangeNodeOutputMessage.ts'
import {
  ClearOutputMessage,
  ClearOutputMessageInput,
  ClearOutputMessageSchema,
} from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import {
  ErrorOutputMessage,
  ErrorOutputMessageInput,
  ErrorOutputMessageSchema,
} from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import {
  RemoveEdgeOutputMessage,
  RemoveEdgeOutputMessageInput,
  RemoveEdgeOutputMessageSchema,
} from '#/schemas/messages/graph/output/RemoveEdgeOutputMessage.ts'
import {
  RemoveGroupOutputMessage,
  RemoveGroupOutputMessageInput,
  RemoveGroupOutputMessageSchema,
} from '#/schemas/messages/graph/output/RemoveGroupOutputMessage.ts'
import {
  RemoveInitialOutputMessage,
  RemoveInitialOutputMessageInput,
  RemoveInitialOutputMessageSchema,
} from '#/schemas/messages/graph/output/RemoveInitialOutputMessage.ts'
import {
  RemoveInportOutputMessage,
  RemoveInportOutputMessageInput,
  RemoveInportOutputMessageSchema,
} from '#/schemas/messages/graph/output/RemoveInportOutputMessage.ts'
import {
  RemoveNodeOutputMessage,
  RemoveNodeOutputMessageInput,
  RemoveNodeOutputMessageSchema,
} from '#/schemas/messages/graph/output/RemoveNodeOutputMessage.ts'
import {
  RemoveOutportOutputMessage,
  RemoveOutportOutputMessageInput,
  RemoveOutportOutputMessageSchema,
} from '#/schemas/messages/graph/output/RemoveOutportOutputMessage.ts'
import {
  RenameGroupOutputMessage,
  RenameGroupOutputMessageInput,
  RenameGroupOutputMessageSchema,
} from '#/schemas/messages/graph/output/RenameGroupOutputMessage.ts'
import {
  RenameInportOutputMessage,
  RenameInportOutputMessageInput,
  RenameInportOutputMessageSchema,
} from '#/schemas/messages/graph/output/RenameInportOutputMessage.ts'
import {
  RenameNodeOutputMessage,
  RenameNodeOutputMessageInput,
  RenameNodeOutputMessageSchema,
} from '#/schemas/messages/graph/output/RenameNodeOutputMessage.ts'
import {
  RenameOutportOutputMessage,
  RenameOutportOutputMessageInput,
  RenameOutportOutputMessageSchema,
} from '#/schemas/messages/graph/output/RenameOutportOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type GraphOutputMessageInput =
  | AddEdgeOutputMessageInput
  | AddGroupOutputMessageInput
  | AddInitialOutputMessageInput
  | AddInportOutputMessageInput
  | AddNodeOutputMessageInput
  | AddOutportOutputMessageInput
  | ChangeEdgeOutputMessageInput
  | ChangeGroupOutputMessageInput
  | ChangeNodeOutputMessageInput
  | ClearOutputMessageInput
  | ErrorOutputMessageInput
  | RemoveEdgeOutputMessageInput
  | RemoveGroupOutputMessageInput
  | RemoveInitialOutputMessageInput
  | RemoveInitialOutputMessageInput
  | RemoveInportOutputMessageInput
  | RemoveNodeOutputMessageInput
  | RemoveOutportOutputMessageInput
  | RenameGroupOutputMessageInput
  | RenameInportOutputMessageInput
  | RenameNodeOutputMessageInput
  | RenameOutportOutputMessageInput

export type GraphOutputMessage =
  | AddEdgeOutputMessage
  | AddGroupOutputMessage
  | AddInitialOutputMessage
  | AddInportOutputMessage
  | AddNodeOutputMessage
  | AddOutportOutputMessage
  | ChangeEdgeOutputMessage
  | ChangeGroupOutputMessage
  | ChangeNodeOutputMessage
  | ClearOutputMessage
  | ErrorOutputMessage
  | RemoveEdgeOutputMessage
  | RemoveGroupOutputMessage
  | RemoveInitialOutputMessage
  | RemoveInportOutputMessage
  | RemoveNodeOutputMessage
  | RemoveOutportOutputMessage
  | RenameGroupOutputMessage
  | RenameInportOutputMessage
  | RenameNodeOutputMessage
  | RenameOutportOutputMessage

export const GraphOutputMessageSchema: S.Schema<GraphOutputMessageInput, GraphOutputMessage> = S.Union(
  AddEdgeOutputMessageSchema,
  AddGroupOutputMessageSchema,
  AddInitialOutputMessageSchema,
  AddInportOutputMessageSchema,
  AddNodeOutputMessageSchema,
  AddOutportOutputMessageSchema,
  ChangeEdgeOutputMessageSchema,
  ChangeGroupOutputMessageSchema,
  ChangeNodeOutputMessageSchema,
  ClearOutputMessageSchema,
  ErrorOutputMessageSchema,
  RemoveEdgeOutputMessageSchema,
  RemoveGroupOutputMessageSchema,
  RemoveInitialOutputMessageSchema,
  RemoveInportOutputMessageSchema,
  RemoveNodeOutputMessageSchema,
  RemoveOutportOutputMessageSchema,
  RenameGroupOutputMessageSchema,
  RenameInportOutputMessageSchema,
  RenameNodeOutputMessageSchema,
  RenameOutportOutputMessageSchema,
)

export const GraphOutputMessageTranscoder = deriveTranscoder(GraphOutputMessageSchema)

export const GraphOutputMessageInputGuard = deriveInputGuard(GraphOutputMessageSchema)

export const GraphOutputMessageGuard = deriveGuard(GraphOutputMessageSchema)
