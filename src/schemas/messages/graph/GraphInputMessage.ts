import * as S from 'schemata-ts'
import { AddEdgeInputMessageSchema } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddGroupInputMessageSchema } from '#/schemas/messages/graph/input/AddGroupInputMessage.ts'
import { AddInitialInputMessageSchema } from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import { AddInportInputMessageSchema } from '#/schemas/messages/graph/input/AddInportInputMessage.ts'
import { AddNodeInputMessageSchema } from '#/schemas/messages/graph/input/AddNodeInputMessage.ts'
import { AddOutportInputMessageSchema } from '#/schemas/messages/graph/input/AddOutportInputMessage.ts'
import { ChangeEdgeInputMessageSchema } from '#/schemas/messages/graph/input/ChangeEdgeInputMessage.ts'
import { ChangeGroupInputMessageSchema } from '#/schemas/messages/graph/input/ChangeGroupInputMessage.ts'
import { ChangeNodeInputMessageSchema } from '#/schemas/messages/graph/input/ChangeNodeInputMessage.ts'
import { ClearInputMessageSchema } from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import { ErrorInputMessageSchema } from '#/schemas/messages/graph/input/ErrorInputMessage.ts'
import { RemoveEdgeInputMessageSchema } from '#/schemas/messages/graph/input/RemoveEdgeInputMessage.ts'
import { RemoveGroupInputMessageSchema } from '#/schemas/messages/graph/input/RemoveGroupInputMessage.ts'
import { RemoveInitialInputMessageSchema } from '#/schemas/messages/graph/input/RemoveInitialInputMessage.ts'
import { RemoveInportInputMessageSchema } from '#/schemas/messages/graph/input/RemoveInportInputMessage.ts'
import { RemoveNodeInputMessageSchema } from '#/schemas/messages/graph/input/RemoveNodeInputMessage.ts'
import { RemoveOutportInputMessageSchema } from '#/schemas/messages/graph/input/RemoveOutportInputMessage.ts'
import { RenameGroupInputMessageSchema } from '#/schemas/messages/graph/input/RenameGroupInputMessage.ts'
import { RenameInportInputMessageSchema } from '#/schemas/messages/graph/input/RenameInportInputMessage.ts'
import { RenameNodeInputMessageSchema } from '#/schemas/messages/graph/input/RenameNodeInputMessage.ts'
import { RenameOutportInputMessageSchema } from '#/schemas/messages/graph/input/RenameOutportInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GraphInputMessageSchema = S.Union(
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

export type GraphInputMessageInput = S.InputOf<typeof GraphInputMessageSchema>

export type GraphInputMessage = S.OutputOf<typeof GraphInputMessageSchema>

export const GraphInputMessageTranscoder = deriveTranscoder(GraphInputMessageSchema)

export const GraphInputMessageInputGuard = deriveInputGuard(GraphInputMessageSchema)

export const GraphInputMessageGuard = deriveGuard(GraphInputMessageSchema)
