import * as S from 'schemata-ts'
import { AddEdgeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/AddEdgeGraphOutputMessage.ts'
import { AddGroupGraphOutputMessageSchema } from '#/schemas/messages/graph/output/AddGroupGraphOutputMessage.ts'
import { AddInitialGraphOutputMessageSchema } from '#/schemas/messages/graph/output/AddInitialGraphOutputMessage.ts'
import { AddInportGraphOutputMessageSchema } from '#/schemas/messages/graph/output/AddInportGraphOutputMessage.ts'
import { AddNodeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { AddOutportGraphOutputMessageSchema } from '#/schemas/messages/graph/output/AddOutportGraphOutputMessage.ts'
import { ChangeEdgeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/ChangeEdgeGraphOutputMessage.ts'
import { ChangeGroupGraphOutputMessageSchema } from '#/schemas/messages/graph/output/ChangeGroupGraphOutputMessage.ts'
import { ChangeNodeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/ChangeNodeGraphOutputMessage.ts'
import { ClearGraphOutputMessageSchema } from '#/schemas/messages/graph/output/ClearGraphOutputMessage.ts'
import { ErrorGraphOutputMessageSchema } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveEdgeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveEdgeGraphOutputMessage.ts'
import { RemoveGroupGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveGroupGraphOutputMessage.ts'
import { RemoveInitialGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveInitialGraphOutputMessage.ts'
import { RemoveInportGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveInportGraphOutputMessage.ts'
import { RemoveNodeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveNodeGraphOutputMessage.ts'
import { RemoveOutportGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveOutportGraphOutputMessage.ts'
import { RenameGroupGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RenameGroupGraphOutputMessage.ts'
import { RenameInportGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RenameInportGraphOutputMessage.ts'
import { RenameNodeGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RenameNodeGraphOutputMessage.ts'
import { RenameOutportGraphOutputMessageSchema } from '#/schemas/messages/graph/output/RenameOutportGraphOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GraphOutputMessageSchema = S.Union(
  AddEdgeGraphOutputMessageSchema,
  AddGroupGraphOutputMessageSchema,
  AddInitialGraphOutputMessageSchema,
  AddInportGraphOutputMessageSchema,
  AddNodeGraphOutputMessageSchema,
  AddOutportGraphOutputMessageSchema,
  ChangeEdgeGraphOutputMessageSchema,
  ChangeGroupGraphOutputMessageSchema,
  ChangeNodeGraphOutputMessageSchema,
  ClearGraphOutputMessageSchema,
  ErrorGraphOutputMessageSchema,
  RemoveEdgeGraphOutputMessageSchema,
  RemoveGroupGraphOutputMessageSchema,
  RemoveInitialGraphOutputMessageSchema,
  RemoveInportGraphOutputMessageSchema,
  RemoveNodeGraphOutputMessageSchema,
  RemoveOutportGraphOutputMessageSchema,
  RenameGroupGraphOutputMessageSchema,
  RenameInportGraphOutputMessageSchema,
  RenameNodeGraphOutputMessageSchema,
  RenameOutportGraphOutputMessageSchema,
)

export type GraphOutputMessageInput = S.InputOf<typeof GraphOutputMessageSchema>

export type GraphOutputMessage = S.OutputOf<typeof GraphOutputMessageSchema>

export const GraphOutputMessageTranscoder = deriveTranscoder(GraphOutputMessageSchema)

export const GraphOutputMessageInputGuard = deriveInputGuard(GraphOutputMessageSchema)

export const GraphOutputMessageGuard = deriveGuard(GraphOutputMessageSchema)
