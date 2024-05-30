import { useContext } from "react"
import { Sorting, Filtering, DispatchContext } from "./App"

const TodoOptions = ({filtering, sorting}:{filtering:Filtering,sorting:Sorting})=>{
  const dispatch = useContext(DispatchContext)
  
  const onFiltering = (show:Filtering)=>{
    show !== filtering && dispatch({type:'filter',show})
  }

  const onSorting = (by: Sorting['by'])=>{
    const value = by !== sorting.by ? // if non-active button was clicked 
      {order:'desc' as const, by}: //  change by what and set default order 
      {order : sorting.order=='asc' ? 'desc' as const : 'asc' as const, by:sorting.by}  // if not - change order only
    dispatch({type:'sort', value})
  }


  const content = (
    <div>
      <input type="button" 
        value={'not done'}
        className={filtering=='notDone'?'active':''}
        onClick={()=>onFiltering('notDone')}
      />
      <input type="button" 
        value={'all'}
        className={filtering=='all'?'active':''}
        onClick={()=>onFiltering('all')}
      />
      <input type="button" 
        value={'done'}
        className={filtering=='done'?'active':''}
        onClick={()=>onFiltering('done')}
      />

      <br/>

      <input type="button" 
        value={'time'}
        className={sorting.by=='time'?`active ${sorting.order}`:''}
        onClick={()=>onSorting('time')}
      />
      <input type="button" 
        value={'priority'}
        className={sorting.by=='priority'?`active ${sorting.order}`:''}
        onClick={()=>onSorting('priority')}
      />
    </div>
  )
  return content
}

export default TodoOptions