import { memo, ReactNode, ReactElement } from "react"

import { GroupHoverMask } from "./IconButton"

const ButtonGroup = memo(({children, className=''}:{children: ReactNode, className?:string})=>{
  return (
  <div className= {`ButtonGroup 
      flex-shrink min-w-max
      bg-transparent rounded-2xl shadow-lg overflow-clip 
      flex
      ${className}
    `}>
    {children}
  </div>
)
})

// tailwind won't purge those because classes are complete
export enum Active {
  no='bg-gray-100 dark:bg-gray-800',
  semi='bg-gray-200 dark:bg-gray-600',
  yes='bg-gray-300 dark:bg-gray-500'
}

export const Button = memo(({icon, label, status=Active.no, onClick}:{icon?:ReactElement, label:string, status?:Active, onClick:()=>void})=>{
  return (
    <div className='ButtonOfGroupContainer
      flex-initial 
      min-w-max md:w-24
      relative overflow-clip 
      group 
      flex justify-between
    '>
      <button className={`ButtonProps
        w-full h-10
        px-[2px] sm:px-1
        uppercase text-shadow-md
        ${status}
        flex justify-center items-center gap-x-1
      `} onClick={onClick}>
       {icon} <span>{label}</span>
      </button>
      <GroupHoverMask onClick={onClick}/>
    </div>
  )
})

export default ButtonGroup