import { useEffect, useState,memo } from "react"

const AutoSaver = memo(({cb}:{cb:()=>any})=>{
  const [[timeout,interval], saveTimeout] = useState<[any,any]>([null,null])
  const [seconds, saveSeconds] = useState(3)

  useEffect(()=>{
      // if new cb is give set new timeout for cb and ticker
      saveTimeout([
        setTimeout(cb,3000),// callculated once at setup
        setInterval(()=>saveSeconds(s=>s-1),1000)
      ])
    return ()=>{
      // clear everything if due time or cb changed
      clearTimeout(timeout)
      clearInterval(interval)
      // end reset seconds
      saveSeconds(3)
    }
  },[cb]) //will reset if callback changes

  return (
    <span>...{seconds}</span>
  )
})

const Button = memo(({cb}:{cb:()=>any})=>{
  return (
    <div onClick={cb}>
      Save<AutoSaver cb={cb}/>
    </div>
  )
})

export default Button