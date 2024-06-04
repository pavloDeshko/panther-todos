import { NextRequest,NextResponse } from "next/server"
import { v4 as uuid } from "uuid"

import { USER_ID } from "./lib/types"

export function middleware(req:NextRequest){
  // for new user
  if(!req.cookies.has(USER_ID)){
    const userId = uuid()
    //req.cookies.set(USER_ID ,userId)
    const res = NextResponse.next()
    res.cookies.set(USER_ID, userId, {
      httpOnly:true,
      sameSite:true,
      secure: process.env.HTTPS == 'true',
      expires: new Date().setFullYear(2100)
    })
    return res
  }
  return NextResponse.next()
}

export const config = {matcher:'/:path*'}