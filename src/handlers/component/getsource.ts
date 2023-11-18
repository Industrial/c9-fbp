import * as TE from 'fp-ts/TaskEither.ts'
import { SourceComponentOutputMessage } from '#/schemas/messages/component/output/SourceComponentOutputMessage.ts'
import { ErrorComponentOutputMessageInput } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'
import { GetSourceComponentInputMessage } from '#/schemas/messages/component/input/GetSourceComponentInputMessage.ts'

export const getsource = (
  _message: GetSourceComponentInputMessage,
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
