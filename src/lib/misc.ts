import {SortBy, SortOrder, FilterBy, Theme, Options, TodoData, Todo} from '@/lib/types'

export const DEFAULT_OPTIONS:Options = {
  sortBy:SortBy.time,
  sortOrder:SortOrder.desc,
  sortCustom:false,
  filterBy:FilterBy.all,
  theme:Theme.light
} as const

export const DEFAULT_TODO_DATA:TodoData = {
  priority:null,
  text:'',
  done:false
} as const

export const compareTodos = (by:SortBy, order:SortOrder)=>(a:Todo,b:Todo)=>{
  const [aa,bb] =  
    (order == SortOrder.asc ? [a,b] : [b,a])
    .map(todo => by == SortBy.priority ? 
      todo.priority == null ? 5 : todo.priority : 
      todo.modified
    )
  return aa > bb ? 1 : aa < bb ? -1 : 0
}