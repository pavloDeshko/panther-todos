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
      h-10 sm:w-60 
      inset-x-5 bottom-5 
      sm:inset-x-auto sm:right-10 sm:top-10
      border-red-600 border-l-8
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


/*

<div class="
  flex
  sm:w-60 
  h-10 
  bg-slate-500
  absolute
  bottom-5
  inset-x-5
  sm:right-10
  sm:top-10
  border-red-600
  border-l-8
">
  <div class="flex-none bg-slate-950 w-10"></div>
  <div class="flex-grow bg-white flex items-center p-3"><span>Error reaching to server :(</span></div>
  <div class="flex-none bg-gray-800 w-10"></div>
</div>

*/