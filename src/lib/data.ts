import {knex} from 'knex'
import { Todo, TodoData} from "@/lib/types"
import { v4 as uuid } from 'uuid'

import configs from '@/../knexfile'
const k = knex(configs.development) //configs[process.env.NODE_ENV])

const sqlite = (k?.client?.config?.client as string)?.includes('lite') !== false
// transform unless false (known to be not SqLite)
const transform = sqlite ? // transform unless
(ar:Todo[]):Todo[]=>ar.map(todo=>{
  return {...todo, 
    created: new Date(todo.created).toISOString(), 
    modified:new Date(todo.modified).toISOString(),
    done: Boolean(todo.done)
  }
})
: (arg:Todo[]):Todo[]=>arg

type dbTodo = Todo & {userId:string}
const table = 'todos' as const
//we shall keep userId in secure cookies only
const columns :(keyof Todo)[] = ['text','done','priority','created','modified','todoId'] as const

export const readTodos = async (userId:string):Promise<Todo[]>=>{
  return transform(await k<dbTodo>(table)
    .select(columns)
    .where({userId})
  )
}

export const createTodo = async (userId:string,todoData:TodoData):Promise<Todo>=>{
  const [result] = transform(await k<dbTodo>(table)
    .insert({...todoData, userId, todoId:uuid()})
    .returning(columns)
  )
  return result
}

export const updateTodo = async (userId:string, todoId:string, data:Partial<TodoData>):Promise<Todo>=>{
  const [result]:(Todo|undefined)[] = transform (await k<dbTodo>(table)
    .where({todoId, userId})
    .update({...data, modified:k.fn.now()})
    .returning(columns)
  )
  if(!result){throw new Error('no such todo for this user')}
  return result
}

export const deleteTodo = async (userId:string,todoId:string):Promise<boolean>=>{
  const result = (await k<dbTodo>(table).delete().where({todoId, userId}))

  if(!result && !sqlite){throw new Error('no such todo for this user')}
  // apparently sqlite bug https://github.com/knex/knex/issues/5757
  return !!result
}
