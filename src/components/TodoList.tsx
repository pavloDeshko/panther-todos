import { memo } from "react"

import { Todo, FilterBy } from "@/lib/types"
import TodoItem from "./TodoItem"

const TodoList = memo(({todos, filterBy}:{todos:Todo[], filterBy:FilterBy})=>{
  return todos.filter(
    todo => filterBy==FilterBy.all || todo.done == (filterBy == FilterBy.done)
  ).map(todo=>
    <TodoItem key={todo.todoId} todoOrData={todo}/>
  )
})

export default TodoList