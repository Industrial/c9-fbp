import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const CapabilitiesSchema = S.Array(S.Union(
  S.Literal('protocol:network'),
  S.Literal('network:persist'),
  S.Literal('network:status'),
  S.Literal('network:data'),
  S.Literal('network:control'),
  S.Literal('protocol:component'),
  S.Literal('component:getsource'),
  S.Literal('component:setsource'),
  S.Literal('protocol:runtime'),
  S.Literal('protocol:graph'),
  S.Literal('graph:readonly'),
  S.Literal('protocol:trace'),
))

export type CapabilitiesInput = S.InputOf<typeof CapabilitiesSchema>

export type Capabilities = S.OutputOf<typeof CapabilitiesSchema>

export const CapabilitiesTranscoder = deriveTranscoder(CapabilitiesSchema)
