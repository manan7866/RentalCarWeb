import { ChangeEventHandler, FC, useState } from "react"
type props ={
    min?: number,
    max?: number,
    value?: number
    bufferd? : number
    onChange?(value: number): void
    onDragStart?(): void
    onDragEnd?(value: number ): void
    className? : string
    

}

 
   
    const Rangeslid: FC<props> = ({min,max,value,bufferd,onChange,onDragStart,onDragEnd,className})=>{
        const [isDraging, setDraging]= useState(false)
      const handlechange : ChangeEventHandler<HTMLInputElement> = (evt)=>{
        if(!onChange) return;
        const {value} = evt.target;
         onChange(+value);

      }
      const handleDragStart = ()=>{
        if(onDragStart) onDragStart()
        setDraging(true)
        

      }
      const handledragEnd  = (e : React.MouseEvent<HTMLInputElement>)=>{
        if(onDragEnd) onDragEnd(+e.currentTarget.value)
        setDraging(false)
        

      }

    
    return (
        <div className={`relative bg-slate-200 flex items-center rounded-md ${className} `}>
                     <input className='slidebar w-full ' min={min} max={max} value={value} onChange={handlechange} type='range'
                     onMouseUp={handleDragStart} onMouseDown={handledragEnd} style={{zIndex: isDraging ? 1 : 2}}
                     ></input>
                     <div style={{width :bufferd + "%"}} className='absolute rounded-md h-full bg-blue-300'></div>
                     <div style={{width : value +"%"}} className='absolute rounded-md h-full bg-blue-500'></div>
                    
                     
                     
                     
                     </div>
    )
    }


export default Rangeslid