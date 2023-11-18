import * as TE from 'fp-ts/TaskEither.ts'
import { SourceComponentInputMessage } from '#/schemas/messages/component/input/SourceComponentInputMessage.ts'
import { SourceComponentOutputMessage } from '#/schemas/messages/component/output/SourceComponentOutputMessage.ts'
import { ErrorComponentOutputMessageInput } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'

export const source = (
  _message: SourceComponentInputMessage,
): TE.TaskEither<Error, Array<SourceComponentOutputMessage | ErrorComponentOutputMessageInput>> =>
  TE.right([
    {
      protocol: 'component',
      command: 'error',
      payload: {
        message: 'foo',
      },
    },
  ])
