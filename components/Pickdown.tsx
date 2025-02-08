// 

import { format } from "date-fns"
import React, { useState , useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"


// `className` prop ko accept karna
interface DropoffProps {
  className?: string; // Optional className
}

const Dropoff: React.FC<DropoffProps> = ({ className }) => {
  const [date, setDate] = React.useState<Date>()
  const [calvis , setcalvis] = useState(false)

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
    <div className={`w-full h-[150px] xs:h-[120px] sm:h-[120px] bg-white rounded-lg xs:px-4 xs:py-4 xs:pb-6  sm:px-4 sm:py-4 px-12 py-6 ${className}`}>
      <div className="flex items-center">
        <input type="radio" name="dot" className="h-5 w-5 mr-2" />
        <p className="font-bold xs:text-[14px] sm:text-[16px] text-xl">Drop-Off</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-bold xs:text-sm sm:text-sm mt-4">Locations</p>
          <Select>
            <SelectTrigger className="w-[150px] 2xl:w-[130px] xs:w-[77px] xs:text-[7px] md:w-[120px] sm:w-[90px] sm:text-[8px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
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
        <div className="h-auto w-[1px] bg-slate-300"></div>
        <div>
          <p className="font-bold xs:text-sm sm:text-sm  mt-4">Time</p>
          <Select>
            <SelectTrigger className="w-[150px] 2xl:w-[130px] md:w-[120px] sm:w-[90px] xs:w-[77px] xs:text-[7px] sm:text-[8px] md:text-xs border-none focus:outline-none active:outline-none text-slate-400 pl-0">
              <SelectValue className="" placeholder="Select your times" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex">
                  <label htmlFor="time-picker" className="block text-sm mb-2"></label>

                  {/* Hour Dropdown using ShadCN Select */}
                  <div className="">
                    <Select value={hour} onValueChange={handleHourChange}>
                      <SelectTrigger className="rounded-lg p-2 text-lg cursor-pointer xs:text-[8px] border-none px-0  focus:outline-none w-auto">
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
                      <SelectTrigger className="rounded-lg p-2 text-lg cursor-pointer xs:text-[8px]  border-none   focus:outline-none mr-96">
                        <SelectValue placeholder="Select Minute" />
                      </SelectTrigger>
                      <SelectContent ref={containerRef}>
                        {[...Array(60)].map((_, minuteIndex) => {
                          const formattedMinute = `${minuteIndex < 10 ? '0' : ''}${minuteIndex}`
                          return (
                            <SelectItem key={formattedMinute} value={formattedMinute}>
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

export default Dropoff
