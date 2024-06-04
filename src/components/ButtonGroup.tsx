import { memo, ReactNode, ReactSVGElement, ElementType, ReactElement } from "react"

import { GroupHoverMask } from "./IconButton"

const ButtonGroup = memo(({children}:{children: ReactNode})=>{
  return (
  <div className="ButtonGroup 
    flex-shrink min-w-0 
    bg-transparent rounded-2xl shadow-lg overflow-clip 
    flex ">
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
      min-w-max flex-initial w-24
      relative overflow-clip 
      group 
      flex justify-between
    '>
      <button className={`ButtonProps
        w-full h-10
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