import wretch, {WretchError} from 'wretch'
import { TodoData, PartialTodoData, TodoSchema} from './types'
import {z,ZodError} from 'zod'

const w = wretch()
  .url('/api')
  .options({credentials:'include'}) // TODO same origin?
  .content('application/json')

const handleNetwork = (er:WretchError):never=>{
  console.error(`${er.status} ${er.message} ${er.text}`)
  throw new Error(`Problems communicating to server - ${er.status} ${er.name} :(`)
}

const handleValidation = (er:ZodError)=>{
  console.error(JSON.stringify(er.issues || er, undefined,'  '))
  return new Error(`Problems making sense of server data - ${er?.message} :(`)
}

const TodosSchema = z.array(TodoSchema)
export const getTodos = async ()=>{
  const data = await w.get()
    .json()
    .catch(handleNetwork)
  try{
    return TodosSchema.parse(data)
  }catch(er:any){
    throw handleValidation(er)
  }
}

export const postTodo = async(data:TodoData)=>{
  const respData = await w.post(data)
    .json()
    .catch(handleNetwork)
  try{
    return TodoSchema.parse(respData)
  }catch(er:any){
    throw handleValidation(er)
  }
}

export const patchTodo = async(todoId:string, data:PartialTodoData)=>{
  const respData = await w.patch({todoId, todoData:data})
    .json()
    .catch(handleNetwork)
  try{
    return TodoSchema.parse(respData)
  }catch(er:any){
    throw handleValidation(er)
  }
}

export const deleteTodo = async(todoId:string)=>{
  await w.delete(todoId)
    .res()
    .catch(handleNetwork)
}