import { memo, useContext } from "react"
import { MdModeNight as IconDark} from "react-icons/md"
import { MdLightMode as IconLight } from "react-icons/md"

import { Theme } from "@/lib/types"
import IconButton from "./IconButton"
import Logo from "@/assets/list_200.png"
import { DispatchContext } from "./App"
import Tooltip from "./Tooltip"


const sectionStyles = `
  w-full 
  bg-section-light dark:bg-section-dark
  rounded-lg border-4 border-todo-light dark:border-todo-dark shadow-lg
  p-4`

const Header = memo(({theme}:{theme:Theme})=>{
  const dispatch = useContext(DispatchContext)
  
  const [label ,icon, value] = theme == Theme.light ? 
    ['go dark', <IconDark/> ,Theme.dark] : 
    ['go light', <IconLight/>,Theme.light]

  return (
    <header className={`PageHeader
      ${sectionStyles}
      relative
      flex justify-between items-stretch gap-2
    `}>
      <div className="LogoArea shrink-0 flex items-center">
      <img  src={Logo.src} width={Logo.width/2} height={Logo.height/2} alt="Pink Panther's Todo List" />
      </div>
      <div className="NameArea 
        w-full flex-initial 
        text-left str
        flex flex-col justify-center items-start">
          <h1 className="text-4xl"><span className='text-pink-500'>Pink</span> Panther's <div className="inline-block">ToDo List</div></h1>
          <h2 className="hidden sm:block text-xl">Todo, todo, todo-todo-todo-todo-todooo...</h2>
      </div>

      <div className="HeaderControls
        absolute top-1 right-1
      ">
        <Tooltip label={label}>
          <IconButton onClick={()=>dispatch({type:'theme',theme:value})}>
            {icon}
          </IconButton> 
        </Tooltip>
      </div>
    </header>
  )
})

export const Footer = ()=>{
  return (
    <footer className={`
      ${sectionStyles}
      p-0
    `}>
      <div>Rights to Pink Panther belong to whoever they belong to :)  No, we don't persistently store your data. Yes, we use cookies</div>
    </footer>
  )
} 

export default Header