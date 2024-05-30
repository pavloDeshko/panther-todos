import { useMemo } from "react"
import { Todo } from "@/lib/types"

type TodoFormProps = {
  text:string, 
  done:boolean, 
  priority: number|null,
  disabled:boolean,
  onChange:(value:Partial<Todo>)=>any
}

type E<T> = React.ChangeEvent<T>
const TodoForm = ({text, done, priority, disabled, onChange}:TodoFormProps)=>{
  const options = useMemo(()=>([...Array(10)].map((_,i)=>i+1).map(i=>(
    <option value={i}>{i}</option>
  ))),[])

  return(<div>
    <input type="text"
      placeholder="..."
      disabled={disabled} // 0 is loading
      value={text}
      onInput={(e:E<HTMLInputElement>)=>onChange({text : e.target.value})}
    />

    <input type="checkbox"
      disabled={disabled}
      checked={done}
      onChange={(e:E<HTMLInputElement>)=>onChange({done : e.target.checked})}
    />

    <select
      disabled={disabled}
      value={String(priority)}
      onChange={(e:E<HTMLSelectElement>)=>onChange({priority : Number(e.target.value)})}
    > 
      <option value='null'> - </option>
      {options}
    </select>
  </div>)
}

export default TodoForm