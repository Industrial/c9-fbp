import * as T from 'fp-ts/Task.ts'
import { ComponentComponentOutputMessageInput } from '#/schemas/messages/component/output/ComponentComponentOutputMessage.ts'
import { ErrorComponentOutputMessageInput } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'
import { GetSourceComponentInputMessage } from '#/schemas/messages/component/input/GetSourceComponentInputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const list: MessageHandler<
  GetSourceComponentInputMessage,
  ComponentComponentOutputMessageInput | ErrorComponentOutputMessageInput
> = (send) => (_message) =>
  T.fromIO(() => {
    send({
      protocol: 'component',
      command: 'error',
      payload: {
        message: 'foo',
      },
    })()
  })
