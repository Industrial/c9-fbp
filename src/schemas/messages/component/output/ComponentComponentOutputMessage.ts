import * as S from 'schemata-ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { ComponentOutputMessageBaseSchema } from '#/schemas/messages/component/ComponentOutputMessageBase.ts'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'

export const ComponentComponentOutputMessageSchema = ComponentOutputMessageBaseSchema
  .extend({
    command: S.Literal<['component']>('component'),
    payload: S.Struct({
      name: S.String(),
      subgraph: S.Boolean,
      inPorts: PortSchema,
      outPorts: PortSchema,
      description: S.Optional(S.String()),
      icon: S.Optional(S.String()),
    }),
  })

export type ComponentComponentOutputMessageInput = S.OutputOf<typeof ComponentComponentOutputMessageSchema>

export type ComponentComponentOutputMessage = S.OutputOf<typeof ComponentComponentOutputMessageSchema>

export const ComponentComponentOutputMessageTranscoder = deriveTranscoder(ComponentComponentOutputMessageSchema)

export const ComponentComponentOutputMessageInputGuard = deriveInputGuard(ComponentComponentOutputMessageSchema)

export const ComponentComponentOutputMessageGuard = deriveGuard(ComponentComponentOutputMessageSchema)
