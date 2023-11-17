import * as TE from 'fp-ts/TaskEither.ts'
import { Value } from '#/schemas/messages/shared/Value.ts'

type ComponentInput = Record<string, Value>

type ComponentOutput = Record<string, Value>

export const Count = () => {
  return (_input: ComponentInput): TE.TaskEither<Error, ComponentOutput> => {
    return TE.left(new Error('NotImplemented'))
  }
}
