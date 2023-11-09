import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ChangeNodeGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['changenode']>('changenode'),
    payload: S.Struct({
      id: S.String(),
      metadata: MetadataNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type ChangeNodeGraphOutputMessageInput = S.InputOf<typeof ChangeNodeGraphOutputMessageSchema>

export type ChangeNodeGraphOutputMessage = S.OutputOf<typeof ChangeNodeGraphOutputMessageSchema>

export const ChangeNodeGraphOutputMessageTranscoder = deriveTranscoder(ChangeNodeGraphOutputMessageSchema)

export const ChangeNodeGraphOutputMessageInputGuard = deriveInputGuard(ChangeNodeGraphOutputMessageSchema)

export const ChangeNodeGraphOutputMessageGuard = deriveGuard(ChangeNodeGraphOutputMessageSchema)
