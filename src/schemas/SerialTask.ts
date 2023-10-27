import * as S from 'schemata-ts/index.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

import { ParallelTask, ParallelTaskInput, ParallelTaskSchema } from '#/schemas/ParallelTask.ts'
import { Task, TaskInput, TaskSchema } from '#/schemas/Task.ts'
import { TaskBase, TaskBaseInput, TaskBaseSchema } from '#/schemas/TaskBase.ts'

export type SerialTaskInput = TaskBaseInput & {
  type: 'SerialTask'
  steps: ReadonlyArray<ParallelTaskInput | TaskInput>
}

export type SerialTask = TaskBase & {
  type: 'SerialTask'
  steps: ReadonlyArray<ParallelTask | Task>
}

export const SerialTaskSchema: S.Schema<SerialTaskInput, SerialTask> = TaskBaseSchema.extend({
  type: S.Literal('SerialTask'),
  steps: S.Lazy('Steps', () => {
    return S.Array(S.Union(TaskSchema, ParallelTaskSchema))
  }),
})

export const SerialTaskTranscoder = deriveTranscoder(SerialTaskSchema)
