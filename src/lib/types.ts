import {z} from 'zod'

export const UuidSchema = z.string().uuid()

export const TodoDataSchema = z.object({
  text : z.string().max(255),
  done : z.coerce.boolean(),// to support sqlite in dev (no boolean)
  priority : z.number().int().min(1).max(10).nullable(),
})
export type TodoData = z.infer<typeof TodoDataSchema>

export const PartialTodoDataSchema = TodoDataSchema.partial()
export type PartialTodoData = z.infer<typeof PartialTodoDataSchema>

export const TodoMetaSchema = z.object({
  todoId: UuidSchema,
  created : z.string().datetime(),
  modified : z.string().datetime()
})
export type TodoMeta = z.infer<typeof TodoMetaSchema>

export const TodoSchema = z.intersection(TodoDataSchema,TodoMetaSchema)
export type Todo = z.infer<typeof TodoSchema>

export const USER_ID = 'userId'
export const OPTIONS = 'options'

export enum SortBy {
  'time',
  'priority',
}
export enum SortOrder {
  'desc',
  'asc',
}
export enum FilterBy {
  'all',
  'notDone',
  'done',
}
export enum Theme {
  'light',
  'dark',
}

export const OptionsSchema = z.object({
  sortBy: z.nativeEnum(SortBy),
  sortOrder: z.nativeEnum(SortOrder),
  sortCustom: z.boolean(),
  filterBy: z.nativeEnum(FilterBy),
  theme: z.nativeEnum(Theme),
})
export type Options = z.infer<typeof OptionsSchema>

export type State = {
  todos: Todo[]
  options: Options,
  lastError: string|null
}