import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'

export const RuntimeOutputMessageSchema = RuntimeOutputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal('runtime'),
  payload: S.Struct({
    secret: S.String(),
  }),
}))

export type RuntimeOutputMessageInput = S.InputOf<typeof RuntimeOutputMessageSchema>

export type RuntimeOutputMessage = S.OutputOf<typeof RuntimeOutputMessageSchema>

export const RuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)
