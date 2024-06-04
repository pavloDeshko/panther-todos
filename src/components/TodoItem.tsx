import { FormEvent, useState, memo, useContext, useCallback, useMemo } from "react"
import { useImmer } from 'use-immer'

import { Todo, TodoData, TodoMeta } from "@/lib/types"
import {getTodos, postTodo, patchTodo, deleteTodo} from '@/lib/ajax'
import { DispatchContext } from "./App"
import AutoSave from "./AutoSave"
import TodoForm from "./TodoForm"

type StatusOrModified = 'loading' | 'idle'  | number // number is timestamp of last modification

const isTodo = (todo:Todo|TodoData): todo is Todo=>{
  return typeof (todo as Todo).todoId == 'string'
}

const TodoItem = memo(({todoOrData}:{todoOrData:Todo|TodoData}) => {
  const dispatch = useContext(DispatchContext)
  
  const [{data,status}, updateLocal] = 
    useImmer<{data:TodoData, status:StatusOrModified}>({data:todoOrData, status:'idle'})
  const meta:TodoMeta|null = isTodo(todoOrData) ? todoOrData :null

  const handleChange = useCallback((value:Partial<Todo>)=>{
    updateLocal(local=>{
      local.data = {...local.data, ...value}
      local.status = Date.now()
    })
  },[])

  const handleCreate = useCallback(async()=>{
    try{
      updateLocal(local => {
        local.status = 'loading'
      })
      const result = await postTodo(data)
      dispatch({type:'create', todo : result})
      updateLocal(local => {
        local.data = todoOrData
        local.status = 'idle'
      })
    }catch{
      dispatch({type:'error',error:"Can't reach server to create todo :("})
      updateLocal(local => {
        local.status = Date.now()
      })
    }
  },[data/*means Change -> resave*/,status])
 
  const handleSave = useCallback(async()=>{
    if(!meta){return} // not supposed to be called on fresh todo
    try{
      updateLocal(local => {
        local.status = 'loading'
      })
      const result = await patchTodo(meta.todoId, data)
      dispatch({type:'edit', todo:result})
      updateLocal(local => {
        local.data = result
        local.status = 'idle'
      })
    }catch{
      dispatch({type:'error',error:"Can't reach server to save todo :("})
      updateLocal(local => {
        local.status = Date.now()
      })
    }
  },[data,status])

  const handleDelete = async()=>{
    if(!meta){return}
    try{
      updateLocal(local => {
        local.status = 'loading'
      })
      await deleteTodo(meta.todoId)
      dispatch({type:'delete', todoId:meta.todoId})
    }catch(er){
      dispatch({type:'error',error:"Can't reach server to delete todo :("})
    }finally{
      updateLocal(local => {
        local.status = 'idle'
      })
    }
  }
  

  return (
    <TodoForm 
      {...data}
      onChange={handleChange} 
      loading={status == 'loading'} 
      fresh={!meta}
      modified={typeof status == 'number'? status : null}
      onSave={ !!meta ? handleSave : handleCreate}
      onDelete={handleDelete}
    />
  )
})

export default TodoItem
