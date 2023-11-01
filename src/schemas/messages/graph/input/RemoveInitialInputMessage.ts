import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { IIPSchema } from '#/schemas/messages/shared/IIP.ts'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveInitialInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinitial']>('removeinitial'),
    payload: S.Struct({
      src: IIPSchema,
      tgt: PortSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveInitialInputMessageInput = S.InputOf<typeof RemoveInitialInputMessageSchema>

export type RemoveInitialInputMessage = S.OutputOf<typeof RemoveInitialInputMessageSchema>

export const RemoveInitialInputMessageTranscoder = deriveTranscoder(RemoveInitialInputMessageSchema)

export const RemoveInitialInputMessageInputGuard = deriveInputGuard(RemoveInitialInputMessageSchema)

export const RemoveInitialInputMessageGuard = deriveGuard(RemoveInitialInputMessageSchema)
