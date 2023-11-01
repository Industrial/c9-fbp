import * as S from 'schemata-ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ErrorOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export type ErrorOutputMessageInput = S.InputOf<typeof ErrorOutputMessageSchema>

export type ErrorOutputMessage = S.OutputOf<typeof ErrorOutputMessageSchema>

export const ErrorOutputMessageTranscoder = deriveTranscoder(ErrorOutputMessageSchema)

export const ErrorOutputMessageInputGuard = deriveInputGuard(ErrorOutputMessageSchema)

export const ErrorOutputMessageGuard = deriveGuard(ErrorOutputMessageSchema)
