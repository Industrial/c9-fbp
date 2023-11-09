import * as S from 'schemata-ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ErrorGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export type ErrorGraphOutputMessageInput = S.InputOf<typeof ErrorGraphOutputMessageSchema>

export type ErrorGraphOutputMessage = S.OutputOf<typeof ErrorGraphOutputMessageSchema>

export const ErrorGraphOutputMessageTranscoder = deriveTranscoder(ErrorGraphOutputMessageSchema)

export const ErrorGraphOutputMessageInputGuard = deriveInputGuard(ErrorGraphOutputMessageSchema)

export const ErrorGraphOutputMessageGuard = deriveGuard(ErrorGraphOutputMessageSchema)
