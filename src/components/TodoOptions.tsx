import { useContext } from "react"
import { PiSortDescendingBold as DescIcon } from "react-icons/pi"
import { PiSortAscendingBold as AscIcon } from "react-icons/pi"

import {FilterBy, SortBy, SortOrder} from "@/lib/types"
import { DispatchContext} from "./App"
import ButtonGroup, {Button, Active} from "./ButtonGroup"

type TodoOptionsProps = {filterBy:FilterBy, sortBy:SortBy, sortOrder:SortOrder, sortCustom:boolean}
const TodoOptions = ({filterBy, sortBy, sortOrder, sortCustom}:TodoOptionsProps)=>{
  const dispatch = useContext(DispatchContext)
  
  const onFiltering = (freshFilterBy:FilterBy)=>{
    freshFilterBy !== filterBy && dispatch({type:'filter',filterBy:freshFilterBy})
  }

  const onSorting = (freshSortBy:SortBy )=>{
    dispatch({type:'sort', sorting:
      freshSortBy !== sortBy ? // if other button was clicked 
        {sortOrder: SortOrder.desc, sortBy:freshSortBy}: //  change by what and set default order 
        {sortOrder : sortOrder == SortOrder.asc ? SortOrder.desc : SortOrder.asc, sortBy}  // if not - change order only
    })
  }
  
  const getFilteringProps = (filter:FilterBy)=>({
    status: filter == filterBy ? !sortCustom ? Active.yes : Active.semi :Active.no,
    onClick: ()=>onFiltering(filter)
  })

  const getSortingProps = (sort:SortBy)=>{
    return {
      status: sort == sortBy ? !sortCustom ? Active.yes : Active.semi :Active.no,
      icon: sort == sortBy ? sortOrder == SortOrder.asc ? <AscIcon/> :<DescIcon/> : undefined,
      onClick: ()=>onSorting(sort)
    }
}

  return (
    <div className="Options flex justify-between gap-1">
      <ButtonGroup>
        <Button label='not done' {...getFilteringProps(FilterBy.notDone)} />
        <Button label='all' {...getFilteringProps(FilterBy.all)} />
        <Button label='done' {...getFilteringProps(FilterBy.done)} />
      </ButtonGroup>
      <ButtonGroup>
        <Button label='time' {...getSortingProps(SortBy.time)} />
        <Button label='priority' {...getSortingProps(SortBy.priority)} />
      </ButtonGroup>
    </div>
  )
}

export default TodoOptions


/* 
  const content = (
    <div>
      <input type="button" 
        value={'not done'}
        className={filterBy==FilterBy.notDone?'active':''}
        onClick={()=>onFiltering(FilterBy.notDone)}
      />
      <input type="button" 
        value={'all'}
        className={filterBy==FilterBy.all?'active':''}
        onClick={()=>onFiltering(FilterBy.all)}
      />
      <input type="button" 
        value={'done'}
        className={filterBy==FilterBy.done?'active':''}
        onClick={()=>onFiltering(FilterBy.done)}
      />

      <br/>

      <input type="button" 
        value={'time'}
        className={sortBy == SortBy.time?`${sortCustom?'semi-':''}active ${SortOrder[sortOrder]}`:''}
        onClick={()=>onSorting(SortBy.time)}
      />
      <input type="button" 
        value={'priority'}
        className={sortBy == SortBy.priority?`active ${SortOrder[sortOrder]}`:''}
        onClick={()=>onSorting(SortBy.priority)}
      />
    </div>
  )
  return content*/