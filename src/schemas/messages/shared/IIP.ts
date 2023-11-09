import * as S from 'schemata-ts'
import { IIPValueSchema } from '#/schemas/messages/shared/IIPValue.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const IIPSchema = S.Struct({
  src: IIPValueSchema,
  tgt: TargetNodeSchema,
  metadata: S.Optional(MetadataEdgeSchema),
})

export type IIPInput = S.InputOf<typeof IIPSchema>

export type IIP = S.OutputOf<typeof IIPSchema>

export const IIPTranscoder = deriveTranscoder(IIPSchema)
