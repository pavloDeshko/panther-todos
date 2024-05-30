import { FormEvent, useState, memo, useContext, useCallback, useMemo } from "react"
import { useImmer } from 'use-immer'

import { Todo, TodoData } from "@/lib/types"
import { DispatchContext } from "./App"
import AutoSaveButton from "./AutoSaveButton"
import TodoForm from "./TodoForm"
import {getTodos, postTodo, patchTodo, deleteTodo} from '@/lib/ajax'

enum Status{
  loading = 0,
  idle = 1,
  modified = 2,
  error = 3
}

const TodoItem = memo(({todo:propTodo, fresh=false}:{todo:Todo, fresh?:boolean}) => {
  const dispatch = useContext(DispatchContext)
  
  const [local, updateLocal] = useImmer({todo:propTodo, status:Status.idle})

  const handleChange = (value:Partial<Todo>)=>{
    updateLocal(local=>{
      local.todo = {...local.todo, ...value}
      local.status = Status.modified
    })
  }
 
  const handleSave = useCallback(async()=>{
    updateLocal(local => {
      local.status = Status.loading
    })
    try{
      const result = await patchTodo(propTodo.todoId, local.todo)
      dispatch({type:'edit', todo:result})
      updateLocal(local => {
        local.todo = result
        local.status = Status.idle
      })
    }catch{
      updateLocal(local => {
        local.status = Status.error
      })
    }
  },[local])

  const handleDelete = async()=>{
    updateLocal(local => {
      local.status = Status.loading
    })
    try{
      await deleteTodo(propTodo.todoId)
      dispatch({type:'delete', todoId:propTodo.todoId})
      updateLocal(local => {
        local.status = Status.idle
      })
    }catch(er){
      // show error
      updateLocal(local => {
        local.status = Status.error
      })
    }
  }
  
  const {text, priority, done} = local.todo
  return (
    <div>
      <TodoForm 
        text={text} 
        priority={priority} 
        done={done} 
        onChange={handleChange} 
        disabled={!local.status} />
    
      <input type='button'
        disabled={!local.status}
        value="delete"
        onClick={handleDelete}
      />

      {//local.todo !== propTodo && /*which means user changed smth */ 
        local.status == Status.modified &&
        <AutoSaveButton cb={handleSave} />
      }
    </div>
  )
})

export default TodoItem