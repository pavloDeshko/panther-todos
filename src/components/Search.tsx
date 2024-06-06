import { memo, useContext } from "react"
import { RiCloseLargeFill  as CloseIcon} from "react-icons/ri"

import { DispatchContext } from "./App"
import IconButton from "./IconButton"

const Search = memo(({value, className=''}:{value:string, className?:string})=>{
  const dispatch = useContext(DispatchContext)

  return (
    <div className="
      flex-shrink-[5]
      flex relative
      h-10
    ">
      <input className={`
        focus:ring-2 focus:ring-pink-500 focus:outline-none
        rounded-2xl
        h-full w-full
        p-1 text-lg
        ${value !== '' ? 'bg-pink-100 dark:bg-pink-800' : 'bg-input-light dark:bg-input-dark'}
      `}
        type='text'
        placeholder="..."
        value={value}
        onChange={(e)=>dispatch({type : 'search', value : e.target.value})}
      ></input>
      {value !== '' &&
        <div className="
          absolute 
          right-1 inset-y-0
          flex items-center justify-center
          z-10"
        >
          <IconButton onClick={()=>dispatch({type : 'search', value : ''})}>
            <CloseIcon/>
          </IconButton>
        </div>
      }
    </div>
  )
})

export default Search