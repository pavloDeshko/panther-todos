import {knex} from 'knex'
import { Todo, TodoData} from "@/lib/types"
import { v4 as uuid } from 'uuid'

import config from '@/../knexfile'
const k = knex(config)

type dbTodo = Todo & {userId:string}
const table = 'todos' as const
//we shall keep userId in secure cookies only
const columns :(keyof Todo)[] = ['text','done','priority','timeStamp','todoId'] as const

export const readTodos = async (userId:string):Promise<Todo[]>=>{
  return await k<dbTodo>(table)
    .select(columns)
    .where({userId})
}

export const createTodo = async (userId:string,todoData:TodoData):Promise<Todo>=>{
  const [result] = await k<dbTodo>(table)
    .insert({...todoData, userId, todoId:uuid()})
    .returning(columns)

  return result
}

export const updateTodo = async (userId:string, todoId:string, data:Partial<TodoData>):Promise<Todo>=>{
  const [result]:(Todo|undefined)[] = await k<dbTodo>(table)
    .where({todoId, userId})
    .update(data)
    .returning(columns)

  if(!result){throw new Error('no such todo for this user')}

  return result
}

export const deleteTodo = async (todoId:string, userId:string):Promise<boolean>=>{
  const result = (await k<dbTodo>(table).delete().where({todoId, userId}))

  if(!result){throw new Error('no such todo for this user')}

  return !!result
}





