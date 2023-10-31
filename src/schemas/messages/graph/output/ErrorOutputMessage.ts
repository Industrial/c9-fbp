import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  GraphOutputMessageBaseInput,
  GraphOutputMessageBaseSchema,
} from '#/schemas/messages/graph/GraphOutputMessageBase.ts'

export type ErrorOutputMessageInput = GraphOutputMessageBaseInput & {
  command: 'error'
  payload: {
    message: string
  }
}

export type ErrorOutputMessage = GraphOutputMessageBaseInput & {
  command: 'error'
  payload: {
    message: string
  }
}

export const ErrorOutputMessageSchema: S.Schema<ErrorOutputMessageInput, ErrorOutputMessage> =
  GraphOutputMessageBaseSchema.extend({
    command: S.Literal<['error']>('error'),
    payload: S.Struct({
      message: S.String(),
    }),
  })

export const ErrorOutputInputMessageTranscoder = deriveTranscoder(ErrorOutputMessageSchema)
