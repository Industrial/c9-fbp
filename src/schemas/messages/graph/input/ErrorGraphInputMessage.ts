import * as S from 'schemata-ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ErrorGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export type ErrorGraphInputMessageInput = S.InputOf<typeof ErrorGraphInputMessageSchema>

export type ErrorGraphInputMessage = S.OutputOf<typeof ErrorGraphInputMessageSchema>

export const ErrorGraphInputMessageTranscoder = deriveTranscoder(ErrorGraphInputMessageSchema)

export const ErrorGraphInputMessageInputGuard = deriveInputGuard(ErrorGraphInputMessageSchema)

export const ErrorGraphInputMessageGuard = deriveGuard(ErrorGraphInputMessageSchema)
