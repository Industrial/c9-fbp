import * as S from 'schemata-ts'
import { ComponentComponentOutputMessageSchema } from '#/schemas/messages/component/output/ComponentComponentOutputMessage.ts'
import { ComponentsReadyComponentOutputMessageSchema } from '#/schemas/messages/component/output/ComponentsReadyComponentReadyOutputMessage.ts'
import { ErrorComponentOutputMessageSchema } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'
import { SourceComponentOutputMessageSchema } from '#/schemas/messages/component/output/SourceComponentOutputMessage.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ComponentOutputMessageSchema = S.Union(
  ComponentComponentOutputMessageSchema,
  ComponentsReadyComponentOutputMessageSchema,
  ErrorComponentOutputMessageSchema,
  SourceComponentOutputMessageSchema,
)

export type ComponentOutputMessageInput = S.InputOf<typeof ComponentOutputMessageSchema>

export type ComponentOutputMessage = S.OutputOf<typeof ComponentOutputMessageSchema>

export const ComponentOutputMessageTranscoder = deriveTranscoder(ComponentOutputMessageSchema)

export const ComponentOutputMessageInputGuard = deriveInputGuard(ComponentOutputMessageSchema)

export const ComponentOutputMessageGuard = deriveGuard(ComponentOutputMessageSchema)
