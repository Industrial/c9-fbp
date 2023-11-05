import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { IIPValueSchema } from '../../shared/IIPValue.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveInitialOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinitial']>('removeinitial'),
    payload: S.Struct({
      src: IIPValueSchema,
      tgt: S.Struct({
        node: NodeIDSchema,
        port: PortIDSchema,
      }),
      graph: GraphIDSchema,
    }),
  })

export type RemoveInitialOutputMessageInput = S.InputOf<typeof RemoveInitialOutputMessageSchema>

export type RemoveInitialOutputMessage = S.OutputOf<typeof RemoveInitialOutputMessageSchema>

export const RemoveInitialOutputMessageTranscoder = deriveTranscoder(RemoveInitialOutputMessageSchema)

export const RemoveInitialOutputMessageInputGuard = deriveInputGuard(RemoveInitialOutputMessageSchema)

export const RemoveInitialOutputMessageGuard = deriveGuard(RemoveInitialOutputMessageSchema)
