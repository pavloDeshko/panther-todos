import { cookies } from "next/headers"

import SingleTodo from "@/components/App"
import {readTodos} from "@/lib/data"
import { UuidSchema, Todo, USER_ID } from "@/lib/types"

export default async function TodosWrapper(){
  let todos :Todo[] = []
  // for initial server render 
  try{
    const userId = UuidSchema.parse(cookies().get(USER_ID))
    todos = userId ? await readTodos(userId) : []
  }catch(er){
    //log it on server
  }

  return (
      <div>
        <SingleTodo todos={todos} />
      </div>
  )
}