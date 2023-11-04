import * as S from 'schemata-ts'
import { AddEdgeOutputMessageSchema } from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import { AddGroupOutputMessageSchema } from '#/schemas/messages/graph/output/AddGroupOutputMessage.ts'
import { AddInitialOutputMessageSchema } from '#/schemas/messages/graph/output/AddInitialOutputMessage.ts'
import { AddInportOutputMessageSchema } from '#/schemas/messages/graph/output/AddInportOutputMessage.ts'
import { AddNodeOutputMessageSchema } from '#/schemas/messages/graph/output/AddNodeOutputMessage.ts'
import { AddOutportOutputMessageSchema } from '#/schemas/messages/graph/output/AddOutportOutputMessage.ts'
import { ChangeEdgeOutputMessageSchema } from '#/schemas/messages/graph/output/ChangeEdgeOutputMessage.ts'
import { ChangeGroupOutputMessageSchema } from '#/schemas/messages/graph/output/ChangeGroupOutputMessage.ts'
import { ChangeNodeOutputMessageSchema } from '#/schemas/messages/graph/output/ChangeNodeOutputMessage.ts'
import { ClearOutputMessageSchema } from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import { ErrorOutputMessageSchema } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveEdgeOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveEdgeOutputMessage.ts'
import { RemoveGroupOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveGroupOutputMessage.ts'
import { RemoveInitialOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveInitialOutputMessage.ts'
import { RemoveInportOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveInportOutputMessage.ts'
import { RemoveNodeOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveNodeOutputMessage.ts'
import { RemoveOutportOutputMessageSchema } from '#/schemas/messages/graph/output/RemoveOutportOutputMessage.ts'
import { RenameGroupOutputMessageSchema } from '#/schemas/messages/graph/output/RenameGroupOutputMessage.ts'
import { RenameInportOutputMessageSchema } from '#/schemas/messages/graph/output/RenameInportOutputMessage.ts'
import { RenameNodeOutputMessageSchema } from '#/schemas/messages/graph/output/RenameNodeOutputMessage.ts'
import { RenameOutportOutputMessageSchema } from '#/schemas/messages/graph/output/RenameOutportOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const GraphOutputMessageSchema = S.Union(
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

export type GraphOutputMessageInput = S.InputOf<typeof GraphOutputMessageSchema>

export type GraphOutputMessage = S.OutputOf<typeof GraphOutputMessageSchema>

export const GraphOutputMessageTranscoder = deriveTranscoder(GraphOutputMessageSchema)

export const GraphOutputMessageInputGuard = deriveInputGuard(GraphOutputMessageSchema)

export const GraphOutputMessageGuard = deriveGuard(GraphOutputMessageSchema)
