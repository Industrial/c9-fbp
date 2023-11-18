import * as TE from 'fp-ts/TaskEither.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'

type ComponentInput = Record<string, Value>

type ComponentOutput = Record<string, Value>

export const Count = () => (_input: ComponentInput): TE.TaskEither<Error, ComponentOutput> =>
  TE.left(new Error('NotImplemented'))
