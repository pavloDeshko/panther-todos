import {z} from 'zod'

export const UuidSchema = z.string().uuid()

export const TodoSchema = z.object({
  todoId: UuidSchema,
  text : z.string().max(255),
  done : z.boolean(),
  priority : z.number().int().min(1).max(10).nullable(),
  timeStamp : z.string().datetime()
})

export const TodoDataSchema = TodoSchema.omit({todoId:true})

export const PartialTodoDataSchema = TodoDataSchema.partial()

export type Todo = z.infer<typeof TodoSchema>

export type TodoData = z.infer<typeof TodoDataSchema>

export type PartialTodoData = z.infer<typeof PartialTodoDataSchema>

export const USER_ID = 'userId'