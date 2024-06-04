import '@/app/globals.css'
import { cookies } from "next/headers"

import { Open_Sans } from "next/font/google"
import type { Metadata } from "next"

import {Theme } from "@/lib/types"
import { getUserOptions } from '@/lib/misc'

const font = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pink Panther's Todo List",
  description: "Todo. Todo. Todo, Todo, Todo, Todo, Todooo..",
}

export default function AppLayout({children}:{children:React.ReactNode}){
  const paddingStyle = `
    hidden 
    sm:block w-1/12 min-w-3 flex-shrink
  `

  return(
    <html lang="en" className={font.className}>
      <body className={getUserOptions(cookies)?.theme == Theme.dark ? 'dark': ''}>
        <div className="Background bg-fixed bg-repeat image bg-tartan">

          <div className="ColumnContainer
            mx-auto
            min-h-screen 
            min-w-72 max-w-3xl
            flex
          ">

            <div className={`LeftPadding
              ${paddingStyle}
              bg-gradient-to-r from-transparent to-backing-light dark:to-backing-dark
            `}></div>
            
            <div className="Column 
              p-2 w-full 
              sm:w-10/12 sm:px-0 sm:py-5
              flex-initial 
              bg-backing-light dark:bg-backing-dark
            ">{children}</div>
            
            <div className={`RightPadding
              ${paddingStyle}
              bg-gradient-to-r from-backing-light dark:from-backing-dark  to-transparent 
            `}></div>
          </div>
        </div>
      </body>
    </html>
  )
}

