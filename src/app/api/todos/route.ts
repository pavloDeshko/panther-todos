import { NextResponse, NextRequest } from "next/server"
import {z} from 'zod'

import { readTodos, updateTodo, createTodo, deleteTodo} from "@/lib/data"
import { TodoDataSchema, UuidSchema } from "@/lib/types"

const getUserId = (req:NextRequest)=> UuidSchema.parse(req.cookies.get('userId'))

export async function GET(req:NextRequest) {
  try{
    const result = await readTodos(getUserId(req))
    return NextResponse.json(result)
  }catch(er){
    return NextResponse.error()
  }
}

export async function POST(req:NextRequest) {
  try{
    const todoData = TodoDataSchema.parse(await req.json())
    const result = await createTodo(getUserId(req), todoData)
    return NextResponse.json(result)
  }catch(er){
    return NextResponse.error()
  }
}

const PatchSchema = z.object({
  todoId:UuidSchema,
  todoData:TodoDataSchema
})
export async function PATCH(req:NextRequest) {
  try{
    const {todoId, todoData} = PatchSchema.parse(await req.json())
    const result = await updateTodo(getUserId(req), todoId, todoData)
    return NextResponse.json(result)
  }catch(er){
    return NextResponse.error()
  }
}

const DeleteSchema = z.string().uuid()
export async function DELETE(req:NextRequest) {
  try{
    const todoId = DeleteSchema.parse(await req.json())
    await deleteTodo(getUserId(req),todoId)
    return new NextResponse(null,{status:204})
  }catch(er){
    return NextResponse.error()
  }
}