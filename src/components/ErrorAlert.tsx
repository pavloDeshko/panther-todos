import { memo, useContext } from "react"
import { MdOutlineError } from "react-icons/md"
import { BiSolidError as ErrorIcon} from "react-icons/bi"
import { RiCloseLargeFill  as CloseIcon} from "react-icons/ri"

import IconButton from "./IconButton"
import { DispatchContext } from "./App"

const ErrorAlert = memo(({message}:{message:string})=>{
  const dispatch = useContext(DispatchContext)

  return (
    <div className="AlertContainer
      absolute flex
      h-12
      inset-x-5 bottom-5 right-0 left-0
      sm:max-w-96 sm:right-2 sm:top-20 sm:left-auto
      border-red-600 border-l-8
      bg-input-light dark:bg-input-dark
    ">
      <div className="AlertIcon flex-none w-10 p-1">
        <ErrorIcon className="PropsToIcon w-full h-full text-icons dark:text-icons-dark" />
      </div>
      <div className="AlertText
        flex-grow 
        flex items-center 
        p-3
        font-semibold
        "><span>{message}</span></div>
      <div className="AlertClose flex-no new-10 p-3">
        <IconButton className="PropsTo h-full w-full" onClick={()=>dispatch({type:'error',error:null})}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  )
})

export default ErrorAlert

