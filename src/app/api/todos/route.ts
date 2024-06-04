import {z} from 'zod'
import { NextResponse, NextRequest } from "next/server"

import { TodoDataSchema, UuidSchema } from "@/lib/types"
import { readTodos, updateTodo, createTodo, deleteTodo} from "@/lib/data"

const getUserId = (req:NextRequest)=> UuidSchema.parse(req.cookies.get('userId')?.value)

export async function GET(req:NextRequest) {
  try{
    const result = await readTodos(getUserId(req))
    return NextResponse.json(result)
  }catch(er){
    console.error(er)
    throw er
  }
}

export async function POST(req:NextRequest) {

    const todoData = TodoDataSchema.parse(await req.json())
    const result = await createTodo(getUserId(req), todoData)
    console.log(result)
    return NextResponse.json(result)

}

const PatchSchema = z.object({
  todoId:UuidSchema,
  todoData:TodoDataSchema
})
export async function PATCH(req:NextRequest) {

    const {todoId, todoData} = PatchSchema.parse(await req.json())
    const result = await updateTodo(getUserId(req), todoId, todoData)
    return NextResponse.json(result)

}

const DeleteSchema = z.string().uuid()
export async function DELETE(req:NextRequest) {
    const todoId = DeleteSchema.parse(await req.json())
    await deleteTodo(getUserId(req),todoId)
    return new NextResponse(null,{status:204})
}