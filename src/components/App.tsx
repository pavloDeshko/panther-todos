"use client"
// client boundary will get 
import Link from 'next/link'
import { Todo, TodoData } from "@/lib/types"
import { useCallback, useMemo, useState, createContext} from 'react'
import { useImmer } from 'use-immer'
import sortBy from 'lodash.sortby'
import reverse from 'lodash.reverse'
import TodoList from './TodoList'
import TodoOptions from './TodoOptions'

type FreshTodo = Omit<Todo,'todoId'>&{todoId:string|null}
export type Sorting = {order:'asc'|'desc', by:'time'|'priority'}
export type Filtering = 'all'|'done'|'notDone'
type State = {
  todos:Todo[],
  sorting:Sorting,
  filtering:Filtering
}

const DEFAULT = {
  //TODO
} as State

type Action = 
  {type:'created', todo:Todo}|
  {type:'delete', todoId:string}|
  {type:'edit', todo:Todo}|
  {type:'sort', value:Sorting}|
  {type:'filter', show:Filtering}

export const DispatchContext = createContext((a:Action)=>{})

export default function App({todos}:{todos:Todo[]}){
  const [state, updateState] = useImmer<State>(DEFAULT)
  
  const dispatch = useCallback((action:Action)=>{
    updateState(state=>{
      // NOTE! 'state' here is not componet's state, but Immer draft, so it can be modified directly  
      // - Immer constructs immutable object and calls setState with it. Also I found that redeclaring
      // it as 'state' (not 'draft') in this scope helps to avoid accidental modifications of original state.
      const find = (id:string)=>state.todos.findIndex(todo=>todo.todoId==id)

      if(action.type == 'created'){
        state.todos.push(action.todo)
      }
      
      if(action.type == 'delete'){
        const i = find(action.todoId)
        state.todos.splice(i,1)
      }
      
      if(action.type == 'edit'){
        const i = find(action.todo.todoId)
        state.todos[i] = action.todo
      }
      
      if(action.type == 'sort'){
        state.sorting = action.value
      }
      
      if(action.type == 'filter'){
        state.filtering = action.show
      }
    })
  },[])

  const displayTodos = useMemo(()=>{
    let result = state.todos.filter(
      todo=>state.filtering=='all' || todo.done == (state.filtering == 'done')
    )
    result = sortBy(result, 
      todo => state.sorting.by == 'time' ? todo.timeStamp : todo.priority
    )
    state.sorting.order == 'desc' && reverse(state.todos)
    return result
  },[state.sorting,state.filtering, state.todos])
  

  return (
   <div>
    <DispatchContext.Provider value={dispatch}>
      <TodoOptions sorting={state.sorting} filtering={state.filtering}/>
      <TodoList todos={displayTodos} />
    </DispatchContext.Provider>
   </div>
  )
}