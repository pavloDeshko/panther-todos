const Tooltip = ({children, label}:{children:React.ReactNode, label:string})=>{
  return (
    <div className="TooltipContainer relative group bg-transparent">
      {children}
      <div className="Tooltip
      bg-slate-700 rounded 
        px-2 py-1
        uppercase text-sm text-center text-slate-400
        absolute min-w-max
        -top-2 -translate-y-full
        -z-1
        hidden
        group-hover:block
    ">{label}</div>
    </div>
  )
}

export default Tooltip
