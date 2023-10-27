import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageBaseSchema } from '../RuntimeInputMessageBase.ts'

export const ErrorOutputMessageSchema = RuntimeInputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal('packet'),
  payload: S.Struct({
    message: S.String(),
  }),
}))

export type ErrorOutputMessageInput = S.InputOf<typeof ErrorOutputMessageSchema>

export type ErrorOutputMessage = S.OutputOf<typeof ErrorOutputMessageSchema>

export const ErrorOutputMessageTranscoder = deriveTranscoder(ErrorOutputMessageSchema)
