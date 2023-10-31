import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessageBaseInput,
  RuntimeOutputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'

export type ErrorOutputMessageInput = RuntimeOutputMessageBaseInput & {
  command: 'error'
  payload: {
    message: string
  }
}

export type ErrorOutputMessage = RuntimeOutputMessageBaseInput & {
  command: 'error'
  payload: {
    message: string
  }
}

export const ErrorOutputMessageSchema: S.Schema<ErrorOutputMessageInput, ErrorOutputMessage> =
  RuntimeOutputMessageBaseSchema.extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export const ErrorOutputInputMessageTranscoder = deriveTranscoder(ErrorOutputMessageSchema)
