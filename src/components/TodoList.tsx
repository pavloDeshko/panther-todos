import { memo } from "react"

import { Todo, FilterBy } from "@/lib/types"
import TodoItem from "./TodoItem"

const TodoList = memo(({todos, filterBy, search}:{todos:Todo[], filterBy:FilterBy, search:string})=>{
  return todos.filter(
    todo => (filterBy==FilterBy.all || todo.done == (filterBy == FilterBy.done))
      && todo.text.includes(search)
  ).map(todo=>
    <TodoItem key={todo.todoId} todoOrData={todo}/>
  )
})

export default TodoList