import * as S from 'schemata-ts'
import { AddEdgeGraphInputMessageSchema } from '#/schemas/messages/graph/input/AddEdgeGraphInputMessage.ts'
import { AddGroupGraphInputMessageSchema } from '#/schemas/messages/graph/input/AddGroupGraphInputMessage.ts'
import { AddInitialGraphInputMessageSchema } from '#/schemas/messages/graph/input/AddInitialGraphInputMessage.ts'
import { AddInportGraphInputMessageSchema } from '#/schemas/messages/graph/input/AddInportGraphInputMessage.ts'
import { AddNodeGraphInputMessageSchema } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddOutportGraphInputMessageSchema } from '#/schemas/messages/graph/input/AddOutportGraphInputMessage.ts'
import { ChangeEdgeGraphInputMessageSchema } from '#/schemas/messages/graph/input/ChangeEdgeGraphInputMessage.ts'
import { ChangeGroupGraphInputMessageSchema } from '#/schemas/messages/graph/input/ChangeGroupGraphInputMessage.ts'
import { ChangeNodeGraphInputMessageSchema } from '#/schemas/messages/graph/input/ChangeNodeGraphInputMessage.ts'
import { ClearGraphInputMessageSchema } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ErrorGraphInputMessageSchema } from '#/schemas/messages/graph/input/ErrorGraphInputMessage.ts'
import { RemoveEdgeGraphInputMessageSchema } from '#/schemas/messages/graph/input/RemoveEdgeGraphInputMessage.ts'
import { RemoveGroupGraphInputMessageSchema } from '#/schemas/messages/graph/input/RemoveGroupGraphInputMessage.ts'
import { RemoveInitialGraphInputMessageSchema } from '#/schemas/messages/graph/input/RemoveInitialGraphInputMessage.ts'
import { RemoveInportGraphInputMessageSchema } from '#/schemas/messages/graph/input/RemoveInportGraphInputMessage.ts'
import { RemoveNodeGraphInputMessageSchema } from '#/schemas/messages/graph/input/RemoveNodeGraphInputMessage.ts'
import { RemoveOutportGraphInputMessageSchema } from '#/schemas/messages/graph/input/RemoveOutportGraphInputMessage.ts'
import { RenameGroupGraphInputMessageSchema } from '#/schemas/messages/graph/input/RenameGroupGraphInputMessage.ts'
import { RenameInportGraphInputMessageSchema } from '#/schemas/messages/graph/input/RenameInportGraphInputMessage.ts'
import { RenameNodeGraphInputMessageSchema } from '#/schemas/messages/graph/input/RenameNodeGraphInputMessage.ts'
import { RenameOutportGraphInputMessageSchema } from '#/schemas/messages/graph/input/RenameOutportGraphInputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GraphInputMessageSchema = S.Union(
  AddEdgeGraphInputMessageSchema,
  AddGroupGraphInputMessageSchema,
  AddInitialGraphInputMessageSchema,
  AddInportGraphInputMessageSchema,
  AddNodeGraphInputMessageSchema,
  AddOutportGraphInputMessageSchema,
  ChangeEdgeGraphInputMessageSchema,
  ChangeGroupGraphInputMessageSchema,
  ChangeNodeGraphInputMessageSchema,
  ClearGraphInputMessageSchema,
  ErrorGraphInputMessageSchema,
  RemoveEdgeGraphInputMessageSchema,
  RemoveGroupGraphInputMessageSchema,
  RemoveInitialGraphInputMessageSchema,
  RemoveInportGraphInputMessageSchema,
  RemoveNodeGraphInputMessageSchema,
  RemoveOutportGraphInputMessageSchema,
  RenameGroupGraphInputMessageSchema,
  RenameInportGraphInputMessageSchema,
  RenameNodeGraphInputMessageSchema,
  RenameOutportGraphInputMessageSchema,
)

export type GraphInputMessageInput = S.InputOf<typeof GraphInputMessageSchema>

export type GraphInputMessage = S.OutputOf<typeof GraphInputMessageSchema>

export const GraphInputMessageTranscoder = deriveTranscoder(GraphInputMessageSchema)

export const GraphInputMessageInputGuard = deriveInputGuard(GraphInputMessageSchema)

export const GraphInputMessageGuard = deriveGuard(GraphInputMessageSchema)
