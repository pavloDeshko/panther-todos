const Tooltip = ({children, label}:{children:React.ReactNode, label:string})=>{
  return (
    <div className="TooltipContainer relative group bg-transparent">
      {children}
      <div className="Tooltip
      bg-slate-700 rounded 
        px-2 py-1
        text-md text-center text-slate-400
        absolute min-w-max
        translate-y-1/2  -translate-x-1/2
        z-50
        hidden
        group-hover:block
    ">{label}</div>
    </div>
  )
}

export default Tooltip
