"use client"
// client boundary
import { useCallback, useMemo, createContext, memo, useEffect} from 'react'
import { useImmer } from 'use-immer'
import Cookies from 'js-cookie'

import { Todo, SortBy, SortOrder, FilterBy, Theme, State, Options } from "@/lib/types"
import {compareTodos, DEFAULT_OPTIONS, DEFAULT_TODO_DATA} from '@/lib/misc'
import Header, {Footer} from './Header'
import TodoList from './TodoList'
import TodoOptions from './TodoOptions'
import TodoItem from './TodoItem'
import ErrorAlert from "./ErrorAlert"

type Action = 
  {type:'create', todo:Todo}|
  {type:'delete', todoId:string}|
  {type:'theme', theme:Theme}|
  {type:'edit', todo:Todo}|
  {type:'sort', sorting: {sortBy:SortBy, sortOrder:SortOrder}}|
  {type:'filter', filterBy:FilterBy}|
  {type:'error', error:string|null}

export const DispatchContext = createContext((a:Action)=>{console.log('empty dispatch')})

export const App = memo((
  {initTodos=[], initOptions=DEFAULT_OPTIONS}:{initTodos?:Todo[], initOptions?:Options}
)=>{
  const initialSortedTodos = useMemo(()=>{// used by set state only on first render, so no need to resort
    return [...initTodos].sort(compareTodos(initOptions.sortBy,initOptions.sortOrder))
  },[])

  const [state, updateState] = useImmer<State>(
    {todos: initialSortedTodos, options:initOptions, lastError:null}
  )
  
  const dispatch = useCallback((action:Action)=>{
    updateState(state=>{
      // NOTE! 'state' here is not componet's state, but Immer draft, so it can be modified directly  
      // - Immer constructs immutable object and calls setState with it. Also I found that redeclaring
      // it as 'state' (not 'draft') in this scope helps to avoid accidental modifications of original state.
      const find = (id:string)=>state.todos.findIndex(todo=>todo.todoId==id)

      if(action.type == 'create'){
        state.todos.push(action.todo)
        state.options.sortCustom = true
      }
      
      if(action.type == 'delete'){
        const i = find(action.todoId)
        state.todos.splice(i,1)
      }
      
      if(action.type == 'edit'){
        const i = find(action.todo.todoId)
        state.todos[i] = action.todo
        state.options.sortCustom = true
      }
      
      if(action.type == 'sort'){
        state.todos.sort(compareTodos(action.sorting.sortBy, action.sorting.sortOrder))
        state.options = {...state.options,...action.sorting, sortCustom:false}
      }
      
      if(action.type == 'filter'){
        state.options.filterBy = action.filterBy
      }

      if(action.type == 'theme'){
        state.options.theme = action.theme
      }
      
      if(['sort', 'filter', 'theme'].includes(action.type)){
        console.log('Cookies set:',Cookies.set('options', JSON.stringify(state.options)))
      }

      if(action.type == 'error'){
        state.lastError = action.error
      }

      if(['create','delete','edit'].includes(action.type)){
        state.lastError = null
      }
      console.log('Action:', JSON.stringify(action,undefined,'  '))
      console.log('New State:', JSON.stringify(state,undefined,'  '))
    })
  },[updateState])
  
  useEffect(()=>{
    state.options.theme == Theme.dark && document.body.classList.add('dark')
    return ()=>{
      document.body.classList.remove('dark')
    }
  },[state.options.theme])

  return (<DispatchContext.Provider value={dispatch}>
    <div className={`App 
      w-full h-full
      flex flex-col justify-between gap-3
      text-text-light dark:text-text-dark
    `}>
      <div className="UpperSection flex flex-col gap-3">
        <Header theme={state.options.theme}/>
        <TodoOptions {...state.options}/>
        <TodoItem todoOrData={{...DEFAULT_TODO_DATA}} />
        <TodoList todos={state.todos} filterBy={state.options.filterBy} />
      </div>
      <Footer/>
      {state.lastError && <ErrorAlert message={state.lastError}/>}
    </div>
  </DispatchContext.Provider>)
})

export default App