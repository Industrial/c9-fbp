import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorComponentOutputMessageInput } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'
import { GetSourceComponentInputMessage } from '#/schemas/messages/component/input/GetSourceComponentInputMessage.ts'
import { ComponentComponentOutputMessageInput } from '#/schemas/messages/component/output/ComponentComponentOutputMessage.ts'

export const list = (
  _message: GetSourceComponentInputMessage,
): TE.TaskEither<Error, Array<ComponentComponentOutputMessageInput | ErrorComponentOutputMessageInput>> =>
  TE.right([
    {
      protocol: 'component',
      command: 'error',
      payload: {
        message: 'foo',
      },
    },
  ])
