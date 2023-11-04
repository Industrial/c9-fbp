import * as S from 'schemata-ts'

export const MessageBaseSchema = S.Struct({
  protocol: S.String(),
  command: S.String(),
  payload: S.UnknownRecord,
})

export type MessageBaseInput = S.InputOf<typeof MessageBaseSchema>

export type MessageBase = S.OutputOf<typeof MessageBaseSchema>
