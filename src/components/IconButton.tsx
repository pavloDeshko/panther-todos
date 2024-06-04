import { memo } from "react"

type IconButtonProps ={
  onClick:()=>void, 
  children:React.ReactNode, 
  className?:string,
  disabled?:boolean,
  smaller?:boolean
}

const IconButton = memo(({children, onClick, className = "", disabled=false, smaller=false}:IconButtonProps)=>(
  <div className="IconButtonContainer 
    relative group 
    overflow-clip rounded-lg
  ">
    <button onClick={onClick} disabled={disabled} className={`Button
      flex items-center justify-center 
      bg-transparent border-none
      text-icons-light dark:text-icons-dark disabled:text-gray-100 dark:disabled:text-gray-800
      ${smaller?'h-6 w-6' : 'h-10 w-10'} text-3xl
      ButtonPropClass ${className}`
    } >
      {children}
    </button>
    <GroupHoverMask onClick={onClick} disabled={disabled}/>
  </div>
))

export const GroupHoverMask = ({disabled=false, onClick}:{onClick:()=>void,disabled?:boolean})=>(
  <div className={`Mask
    hidden group-hover:block 
    absolute inset-0
    bg-white opacity-20
    cursor-pointer
    ${disabled ? 'hidden' : ''}
  `} onClick={onClick}></div>
)

export default IconButton

