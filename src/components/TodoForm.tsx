import { useMemo } from "react"
import { IoCreate as CreateIcon } from "react-icons/io5"
import { FaPlusCircle } from "react-icons/fa"
import { MdDeleteForever as DeleteIcon } from "react-icons/md"
import { FaWindowClose } from "react-icons/fa"
import { MdSaveAs as SaveIcon } from "react-icons/md"
import { TbLoader2 as LoadIcon} from "react-icons/tb"

import { Todo } from "@/lib/types"
import IconButton from "./IconButton"
import Tooltip from "./Tooltip"
import AutoSave from "./AutoSave"

type TodoFormProps = {
  text:string, 
  done:boolean, 
  priority: number|null,
  loading:boolean,
  fresh:boolean,
  modified:number|null,
  onChange:(value:Partial<Todo>)=>void,
  onDelete:(()=>void),
  onSave:(()=>void) 
}

const TodoForm = ({text, done, priority, loading, fresh,modified, onChange, onDelete, onSave}:TodoFormProps)=>{
  const heatScale = [
    'bg-[#00ff29]',
    'bg-[#00ff96]',
    'bg-[#00fbff]',
    'bg-[#008fff]',
    'bg-[#0022ff]',
    'bg-[#4b00ff]',
    'bg-[#b800ff]',
    'bg-[#ff00da]',
    'bg-[#ff006d]',
    'bg-[#ff0000]'
  ] as const

  const priorities = useMemo(() => (
      <>
        {heatScale.map((c, i) => (
          <button
            className={`PriorityButton 
              ${c} 
              h-2 ${
                priority == (i + 1) ? 'min-h-full border-4 border-white' : ''
              }
              flex-shrink w-6
              rounded-md
            `}
            key={i + 1}
            /* disabled={loading} TODO make so it's not reredering evyrything*/
            onClick={() => onChange({ priority: i + 1 })}
          ><Tooltip label={`priority ${i+1}`}><div className="w-full h-2"></div></Tooltip></button>
          
        ))}
      </>
  ), [priority, onChange])


  const ringStyle = 'focus:ring-2 focus:ring-pink-500 focus:outline-none'

  return (
    <div className="TodoContainer
      flex space-x-3 items-center
      rounded-lg shadow-lg
      bg-todo-light dark:bg-todo-dark
      border-2 border-input-light dark:border-input-dark
      px-5 py-7
      overflow-visible 
      relative
    ">
      <div className={`CheckboxContainer
        flex-shrink-0
        flex items-center
        ${fresh?'hidden':''}
      `}>
        <Tooltip label="done ?">
          <input type="checkbox" className={`DoneCheckbox
            form-checkbox 
            w-11 h-11
            rounded-lg
            bg-input-light
            dark:bg-input-dark
            text-pink-500 
            ${ringStyle}
          `}
            disabled={loading}
            checked={done}
            onChange={(e)=>onChange({done : e.target.checked})}
          />
        </Tooltip>
      </div>

      <div className="CenterContainer flex-grow relative ">
        <input type='text' className={`TextArea
          form-textarea
          w-full h-12
          p-1 
          rounded-lg
          text-3xl 
          resize-none
          bg-input-light
          dark:bg-input-dark
          ${ringStyle}
        `} 
          maxLength={255}
          placeholder="what to do?.."
          disabled={loading} 
          value={text}
          onChange={e=>onChange({text : e.target.value})}
        ></input>
        
        <div className="PrioritiesContainer
          absolute -bottom-5 w-full h-3 
          flex justify-between items-center
        ">
          {priorities}
        </div>
        

        <div className="InTextButtonContainer
          absolute 
          right-1 inset-y-0
          flex items-center justify-center
          z-10 
        ">
          {!!modified ? 
            <Tooltip label={fresh ? 'create new todo' : 'save changes'}>
              <IconButton
                disabled={loading}
                onClick={onSave}
              >
                {fresh ? <CreateIcon/> : <SaveIcon/>}
              </IconButton>
            </Tooltip>
          : loading ?
            <div className=" ">
              <LoadIcon className="animate-spin"/>
            </div>
          : null
          }
        </div>
      </div>

      <div className="ControlsContainer width-0 text-icons-light dark:text-icons-dark">
        {!fresh && <div className="DeleteButtonCont
          absolute 
          top-1 right-1
        ">
          <Tooltip label="delete forever">
            <IconButton smaller={true}
              disabled={loading||!!modified}
              onClick={onDelete}
            >
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </div>}
  
        {!!modified && text.trim() && !fresh &&  
          <div className="absolute right-2 inset-y-0 flex items-center">
             <AutoSave cb={onSave} lastInput={modified}  />
          </div>
        } 
        
      </div>
    </div>

  )
}

export default TodoForm
