import { useEffect, useState,memo } from "react"

const AutoSaver = memo(({cb, lastInput}:{cb:()=>any, lastInput:number})=>{
  const [[timeout,interval], saveTimeouts] = useState<[any,any]>([null,null])
  const [seconds, saveSeconds] = useState(0)

  useEffect(()=>{
      // if new cb is give set new timeout for cb and interval for ticker
      const s = Math.ceil((Date.now() - lastInput) / 1000)
      if(s > 0){
        saveTimeouts([
          setTimeout(cb, s*1000),// callculated once at setup
          setInterval(()=>saveSeconds(s=>s-1),1000)
        ])
        saveSeconds(s)
      }
    return ()=>{
      // clear everything if due time or cb changed
      clearTimeout(timeout)
      clearInterval(interval)
      // end reset seconds
      saveSeconds(0)
    }
  },[cb]) //will reset if callback changes or component rerenders

  return (
    null//seconds > 0 && <span className= "AutosaveText text-icons dark:text-icons-dark">...{seconds}</span>
  )
})

export default AutoSaver