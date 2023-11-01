import * as S from 'schemata-ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ErrorInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export type ErrorInputMessageInput = S.InputOf<typeof ErrorInputMessageSchema>

export type ErrorInputMessage = S.OutputOf<typeof ErrorInputMessageSchema>

export const ErrorInputMessageTranscoder = deriveTranscoder(ErrorInputMessageSchema)

export const ErrorInputMessageInputGuard = deriveInputGuard(ErrorInputMessageSchema)

export const ErrorInputMessageGuard = deriveGuard(ErrorInputMessageSchema)
