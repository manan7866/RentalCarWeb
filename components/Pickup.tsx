// import { FiTable } from "react-icons/fi"
// import { format } from "date-fns"
// import React, { useState , useRef } from "react"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectScrollDownButton,
//   ChevronDown
// } from "@/components/ui/select"
// import {Calendar} from "@/components/ui/calendar"
// import CustomTimePicker from "@/app/(user)/Login/page"


// const Pickup = ()=>{
//     const [date, setDate] = React.useState<Date>()
//     const [calvis , setcalvis] = useState(false)
    
//     const toggle = ()=>{
//       setcalvis(!calvis)
//     }
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Scroll down function
  
//     const [hour, setHour] = useState<string>('12');
//     const [minute, setMinute] = useState<string>('00');
  
//     const handleHourChange = (value: string) => {
//       setHour(value);
//     };
  
//     const handleMinuteChange = (value: string) => {
//       setMinute(value);
//     };
//     return(

// <div className="w-auto h-[150px] bg-white  rounded-lg 2xl:px-4 px-12 py-6">
//           <div className="flex items-center"><input type="radio" name="dot" className="h-5 w-5 mr-2" ></input>
//           <p className="font-bold text-xl">Pick-Up</p>
//           </div>
//           <div className="flex justify-between">
//             <div>
//               <p className="font-bold mt-4" >Locations</p>
//               <Select >
//   <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[90px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
  
//     <SelectValue className="" placeholder="Select your city" />
    
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="light">Karachi</SelectItem>
//     <SelectItem value="dark">Lahore</SelectItem>
//     <SelectItem value="system">Quetta</SelectItem>
//     <SelectItem value="hh">Islamabad</SelectItem>
//   </SelectContent>
// </Select>
//             </div>
//             <div className="h-auto  w-[1px] bg-slate-300"></div>
//             <div >
//               <p className="font-bold mt-4" >Date</p>
//               <Select>
//   <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[90px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
  
//   {date ? format(date, "PPP") : <SelectValue className="" placeholder="Select your city" />}
//   { date ? !calvis : (  <SelectContent>
   
//    <Calendar onDayClick={toggle}
//    mode="single"
//    selected={date}
//   onSelect={setDate}
//    initialFocus
//  / >
//    </SelectContent>)}  
//   </SelectTrigger>

// </Select>
//             </div>
//             <div className="h-auto  w-[1px] bg-slate-300"></div>
//             <div >
//               <p className="font-bold mt-4" >Time</p>
//               <Select>
//   <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[90px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
    
    
//     <SelectValue className="" placeholder="Select your times" />
    
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="light"><div className="flex">
//       <label htmlFor="time-picker" className="block text-sm mb-2"></label>

//       {/* Hour Dropdown using ShadCN Select */}
//       <div className="">
//         <Select value={hour} onValueChange={handleHourChange}>
//           <SelectTrigger className="rounded-lg p-2 text-lg cursor-pointer focus:outline-none ">
//             <SelectValue placeholder="Select Hour" />
//           </SelectTrigger>
//           <SelectContent ref={containerRef}>
//             {[...Array(24)].map((_, hourIndex) => {
//               const formattedHour = `${hourIndex < 10 ? '0' : ''}${hourIndex}`;
//               return (
//                 <SelectItem key={formattedHour} value={formattedHour} className="text-black">
//                   {formattedHour} 
//                 </SelectItem>
//               );
//             })}
//           </SelectContent>
//         </Select>

//         {/* Scroll down button inside the hour select dropdown */}
       
//       </div>

//       {/* Minute Dropdown using ShadCN Select */}
//       <div className="flex items-center text-2xl"> :
//         <Select value={minute} onValueChange={handleMinuteChange}>
//           <SelectTrigger className="  rounded-lg p-2 2xl:w-full text-lg cursor-pointer focus:outline-none  mr-96 ">
//             <SelectValue placeholder="Select Minute" />
//           </SelectTrigger>
//           <SelectContent ref={containerRef}>
//             {[...Array(60)].map((_, minuteIndex) => {
//               const formattedMinute = `${minuteIndex < 10 ? '0' : ''}${minuteIndex}`;
//               return (
//                 <SelectItem key={formattedMinute} value={formattedMinute}>
//                   {formattedMinute}
//                 </SelectItem>
//               );
//             })}
//           </SelectContent>
//         </Select>

//         {/* Scroll down button inside the minute select dropdown */}
       
//       </div>

//       {/* Display Selected Time */}
//       <div className="mt-2">
        
//       </div>
//     </div></SelectItem>
 
//   </SelectContent>
// </Select>
//             </div>
            
         
//           </div>
//         </div>
//     )
// }
// export default Pickup;

import { format } from "date-fns"
import React, { useState, useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"


// `className` prop ko accept karna
interface PickupProps {
  className?: string; // Optional className
}

const Pickup: React.FC<PickupProps> = ({ className }) => {
  const [date, setDate] = React.useState<Date>()
  const [calvis, setcalvis] = useState(false)

  const toggle = () => {
    setcalvis(!calvis)
  }
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll down function
  const [hour, setHour] = useState<string>('12')
  const [minute, setMinute] = useState<string>('00')

  const handleHourChange = (value: string) => {
    setHour(value)
  }

  const handleMinuteChange = (value: string) => {
    setMinute(value)
  }

  return (
    <div className={`w-auto sm:h-[120px] xs:h-[120px] h-[150px] bg-white rounded-lg xs:px-4 xs:py-4 xs:pb-6 sm:px-4 sm:py-4 px-12 py-6 ${className}`}>
      <div className="flex items-center">
        <input type="radio" name="dot" className="h-5 w-5 mr-2" />
        <p className="font-bold sm:text-[16px] xs:text-[14px] text-xl">Pick-Up</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-bold xs:text-sm sm:text-sm mt-4">Locations</p>
          <Select>
            <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[120px] sm:w-[90px] xs:w-[77px] xs:text-[7px] sm:text-[8px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
              <SelectValue className="" placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Karachi</SelectItem>
              <SelectItem value="dark">Lahore</SelectItem>
              <SelectItem value="system">Quetta</SelectItem>
              <SelectItem value="hh">Islamabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-auto w-[1px] bg-slate-300"></div>
        <div>
          <p className="font-bold xs:text-sm sm:text-sm  mt-4">Date</p>
          <Select>
            <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[120px] xs:w-[77px] xs:text-[7px] sm:w-[90px] sm:text-[8px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
              {date ? format(date, "PPP") : <SelectValue className="" placeholder="Select your city" />}
              {date ? !calvis : (
                <SelectContent>
                  <Calendar onDayClick={toggle} mode="single" selected={date} onSelect={setDate} initialFocus />
                </SelectContent>
              )}
            </SelectTrigger>
          </Select>
        </div>
        <div className="h-auto  w-[1px] bg-slate-300"></div>
        <div>
          <p className="font-bold xs:text-sm sm:text-sm  mt-4">Time</p>
          <Select>
            <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[120px] xs:w-[77px] xs:text-[7px] sm:w-[90px] sm:text-[8px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
              <SelectValue className="" placeholder="Select your times" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex">
                  <label htmlFor="time-picker" className="block text-sm mb-2"></label>

                  {/* Hour Dropdown using ShadCN Select */}
                  <div className="">
                    <Select value={hour} onValueChange={handleHourChange}>
                      <SelectTrigger className="rounded-lg p-2 xs:text-[8px] text-lg border-none px-0 cursor-pointer focus:outline-none ">
                        <SelectValue placeholder="Select Hour" />
                      </SelectTrigger>
                      <SelectContent ref={containerRef}>
                        {[...Array(24)].map((_, hourIndex) => {
                          const formattedHour = `${hourIndex < 10 ? '0' : ''}${hourIndex}`
                          return (
                            <SelectItem key={formattedHour} value={formattedHour} className="text-black">
                              {formattedHour}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minute Dropdown using ShadCN Select */}
                  <div className="flex items-center xs:text-[8px] text-2xl"> :
                    <Select value={minute} onValueChange={handleMinuteChange}>
                      <SelectTrigger className="rounded-lg p-2 2xl:w-full  text-lg xs:text-[8px] border-none cursor-pointer focus:outline-none mr-96 ">
                        <SelectValue placeholder="Select Minute" />
                      </SelectTrigger>
                      <SelectContent ref={containerRef}>
                        {[...Array(60)].map((_, minuteIndex) => {
                          const formattedMinute = `${minuteIndex < 10 ? '0' : ''}${minuteIndex}`
                          return (
                            <SelectItem className="w-32 xs:text-[8px]" key={formattedMinute} value={formattedMinute}>
                              {formattedMinute}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Display Selected Time */}
                  <div className="mt-2 "></div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default Pickup
