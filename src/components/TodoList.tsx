import { memo } from "react"

import { Todo } from "@/lib/types"
import TodoItem from "./TodoItem"

const TodoList = memo(({todos}:{todos:Todo[]})=>{
  return todos.map(todo=>
    <TodoItem key={todo.todoId} todo={todo}/>
  )
})

export default TodoList