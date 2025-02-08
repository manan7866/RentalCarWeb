
import Search   from "@/app/public/search.svg"
import filter from "@/app/public/filter.svg"
import Image from "next/image";
import { HiHeart } from "react-icons/hi2";
import noti from "@/app/public/notification.svg"
import { RiSettings4Fill } from "react-icons/ri";


import { VscMenu } from "react-icons/vsc";
import { usePathname } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";


import home from "@/public/Dashboard/home.png"
import car from "@/public/Dashboard/car.png"
import chart from "@/public/Dashboard/chart.png"
import wallet from "@/public/Dashboard/wallet.png"
import message from "@/public/Dashboard/message.png"
import calendar from "@/public/Dashboard/calendar.png"

import setting from "@/public/Dashboard/setting.png"
import help from "@/public/Dashboard/help.png"
import briefcase from "@/public/Dashboard/briefcase.png"

import logout from "@/public/Dashboard/logout.png"

import sun from "@/public/Dashboard/sun.png"
import moon from "@/public/Dashboard/moon.png"
import Link from "next/link";
import { FilterContext } from '@/context/FilterContext';
import React, { useContext } from 'react'

import {
    
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
 type car = {
    _id : number,
    name : string,
    slug :{ current : string},
    image : string,
    catagory : string,
 }


 

import { useEffect, useState } from "react";
import Rangeslid from "@/components/Slid"
import { client } from "@/sanityClient";

import { urlFor } from "@/sanity/lib/image";

export default function Header (){
    const [activeIndex, setActiveIndex] = useState(0);
    const { twop, setTwop, fourp, setFourp, sixp, setSixp ,ischeked , setischeked,issuv , setsuv, issudan , setsudan ,ishb , sethb, value , setValue  ,trigr, setTrigr }= useContext(FilterContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<car[]>([]);
    const [loading, setLoading] = useState(false);
    
  // Function to fetch suggestions from Sanity
  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    if (query.trim().length > 0) {
      const queryStr = `*[_type == "cars" && name match $query] {
        _id,
        slug,
        name,
        image,
        catagory
      }`;

      try {
        const results = await client.fetch(queryStr, { query: `${query}*` });  // Wildcard query for fuzzy matching
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
    setLoading(false);
  };

  // Effect to fetch suggestions when search query changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimeout);  // Cleanup on query change
  }, [searchQuery]);

  // Handle car selection from suggestions
  const handleSelectCar = (car : car) => {
    if (car?.slug?.current) {
      window.location.href = `/detail/${car.slug.current}`;
    } else {
      console.error("Car slug not found!");
    }
  };




  const handletrigr = ()=>{
    setTrigr(!trigr)
    
  }


  const menuItems = [
      {
          label: "Dashboard",
          image: home,
      },
      {
          label: "Car Rent",
          image: car,
      },
      {
          label: "Insight",
          image: chart,
      },
      {
          label: "Reimburse",
          image: wallet,
      },
      {
          label: "Inbox",
          image: message,
      },
      {
          label: "Calender",
          image: calendar
      },
  ];


  
  const [menu , setmenu] = useState(false)
  const handlemenu =()=>{
    setmenu(!menu)
  }
  const mp = usePathname();
  const linkHref = mp !== "/catagory" ? "/catagory" : window.location.pathname;
 return(
  <div>
   <div className="flex justify-between px-14  h-[124px] xs:px-4 xs:py-4 xs:h-[60px] sm:h-[70px] sm:px-6 sm:py-6 md:h-[90px] md:px-6 md:py-6 xl:h-[110px] w-full items-center"> 
   <div className="m2xl:hidden 2xl:hidden ">
   { mp ==='/' ? (<div className="cursor-pointer"><Link href="/"><div className=" text-[55px] m2xl:hidden  lg:text-[40px] xs:text-[28px] sm:text-[28px] md:text-[30px] 2xl:hidden  text-blue-500 font-semibold font-sans ">MORENT</div></Link></div>) : (<div className="hidden xs:block  sm:block md:block xl:block lg:text-4xl xs:text-2xl sm:text-2xl md:text-2xl lg:block text-slate-400 text-6xl"><VscMenu onClick={handlemenu} className="lg:mb-7 " /></div>)}
   </div>
   
    <div className="xl:hidden xs:hidden sm:hidden lg:hidden md:hidden  flex items-center gap-24 ">
    <Link href="/">
    <div className="text-[44px] text-blue-500 font-semibold font-sans  pl-6">MORENT</div></Link>
    <div>
    <div className="h-[44px] w-[510px] rounded-3xl border-slate-300 border-[1px] flex items-center px-3 justify-between">
        <div className=" flex gap-2  ">
        <Image src={Search} height={28} width={28} alt="search" className="text-sm"></Image>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="  Search something here" className="focus:outline-none pl-2"></input>
        </div>
        <Image src={filter} height={28} width={28} alt="filter"></Image>
        
    </div>
    <div className="absolute w-[510px] rounded-xl">
    {searchQuery && suggestions.length > 0 && (
  <ul className="suggestions-list ">
    {loading ? (
      <li className="suggestions-item">Loading...</li>
    ) : (
      suggestions.map((suggestion) => (
        <li
          key={suggestion._id}
          onClick={() => handleSelectCar(suggestion)} // Navigate to the car detail page
          className="suggestions-item flex flex-row-reverse justify-between text-xl bg-white py-2 hover:bg-blue-300 px-4 items-center "
          
        >
          <Image
            src={urlFor(suggestion.image).url() }
            alt={suggestion.name}
            className="suggestions-image "
            width={100}
            height={0}
          />
          <span className="suggestions-text cursor-pointer">
            {suggestion.name} - {suggestion.catagory}
          </span>
        </li>
      ))
    )}
  </ul>
)}
    </div>
    </div>
    
    
    

   </div>
   <div className="flex h-[44px] xl:hidden xs:hidden sm:hidden lg:hidden md:hidden w-[250px] justify-between">
         <Link href='/cart'>
        <div className="h-full w-[44px] rounded-full border-slate-300 border-[1px] flex justify-center items-center "><HiHeart className="text-2xl text-slate-500 "/></div></Link>
        <div className="h-full w-[44px] rounded-full border-slate-300 border-[1px] flex justify-center items-center relative"><Image src={noti} height={28} width={28} alt=""></Image>
         <div className="h-3 w-3 rounded-full bg-red-500 absolute top-[1px] right-0 "></div>
         </div>
        <div className="h-full w-[44px] rounded-full border-slate-300 border-[1px] flex justify-center items-center"><RiSettings4Fill className="text-2xl text-slate-500 " /></div>
        <div className="h-full rounded-full   border-slate-300 text-slate-400 border-[1px] text-xl py-2 px-2 ">
    <SignedOut >
      <SignInButton  />
    </SignedOut>
    <SignedIn>
      <UserButton  />
    </SignedIn>
    
  </div>
    </div>
    <div className=" hidden xl:block xs:block lg:block sm:block md:block   sm:py-1 sm:px-3 py-3 px-3  xs:h-[38px]  xs:py-1 xs:px-1 rounded-full border-slate-300 border-[1px] "><SignedOut >
      <SignInButton  />
    </SignedOut>
    <SignedIn>
      <UserButton  />
    </SignedIn></div>
    
  </div>
  <div className="hidden xs:block lg:block sm:block  md:block  xl:block xs:px-4 xs:pb-4 sm:px-6 sm:pb-6 md:px-6 md:pb-6 pb-12 px-14">
  { mp ==='/' ? (<div></div>) : (<Link href="/"><div className="cursor-pointer text-[55px] lg:text-[40px] xs:text-[28px] sm:text-[28px] md:text-[30px] xs:mb-3 sm:mb-3 md:mb-3 mb-6   text-blue-500 font-semibold font-sans ">MORENT</div></Link>)}
  
  <div className="flex justify-between gap-6 xs:gap-2 sm:gap-2 w-full ">
  <div className="h-[80px] lg:h-[60px] md:h-[50px] xs:h-[40px] sm:h-[40px] w-full  rounded-xl border-slate-300 border-[1px] flex items-center px-3  justify-between">
        <div className=" flex gap-2 sm:gap-1 md:text-[30px]  sm:text-[28px] lg:text-[40px] ">
        <Image src={Search} height={45} width={45} alt="search" className="lg:h-[40px]  lg:w-[40px] md:h-[30px] md:w-[30px] xs:h-[28px] xs:w-[28px] sm:h-[28px] sm:w-[28px]"></Image>
        <input placeholder="  Search something here" className="focus:outline-none lg:text-2xl xs:w-[87px] xs:text-xl sm:text-xl md:text-xl sm:w-60 pl-2 text-3xl"></input>
        </div>
        
    </div>
    
  <div className=" h-[80px] xs:w-[50px] xs:h-[40px] sm:w-[50px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:h-[60px] lg:w-[60px] w-[80px] flex justify-center items-center rounded-xl border-slate-300 border-[1px] ">
  <Image className="lg:h-[40px] lg:w-[40px] md:h-[30px] md:w-[30px] xs:h-[28px] xs:w-[38px] sm:h-[28px] sm:w-[38px]" src={filter} height={45} width={45} alt="filter"></Image>
  

  </div>
  </div>
  </div>
  <hr/>
  {menu && (
    <div className="absolute xs:top-[175px] sm:top-[179px] xs:w-auto top-[205px] lg:top-[320px] z-10 bg-white">
      {mp === '/admin' ? ( <main>
                <div className="w-auto h-auto py-6 bg-white">
                <RxCross1 onClick={handlemenu}  className='absolute top-2 right-2 text-zxl' />


                    {/* Main Menu Section */}
                    <div className="justify-start">
                        <h6 className="text-[#90A3BF] text-[12px] font-semibold ml-6">MAIN MENU</h6>
                        <div className="space-y-3 pt-5">
                        {/* Loop through menu items */}
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer ${activeIndex === index ? "bg-[#3563E9] text-white" : "bg-white"
                                    } hover:bg-blue-200`}
                                onClick={() => setActiveIndex(index)} // Set this item as active
                            >
                                {/* icon */}

                                <Image src={item.image} className="w-8 xs:w-3 md:w-4 md:h-4 sm:w-4 sm:h-4 fill-white" alt="Icon" />

                                {/* Label */}
                                <label
                                    htmlFor={item.label}
                                    className={`${activeIndex === index ? "text-white" : "text-[#90A3BF]"
                                        } group-hover:text-white text-[16px] md:text-sm sm:text-sm xs:text-sm font-medium`}
                                >
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                        </div>

                    {/* Prefrences  */}
                    <div className="justify-start pt-20">
                        <h6 className="text-[#90A3BF] text-[12px] font-semibold ml-6">PREFERENCES</h6>
                        <div className="space-y-3 pt-5">
                            <div className="flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                <Image src={setting} id="logout" className="w-3 lg:w-8 md:h-4 sm:w-4  fill-white" alt="Icon" />
                                <label
                                    htmlFor="setting"
                                    className="text-[#90A3BF] text-[16px] md:text-sm sm:text-sm xs:text-sm font-medium group-hover:text-white">
                                    Setting
                                </label>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                <Image src={help} id="logout" className="w-8 h-8 md:h-4 xs:h-3 sm:w-4 sm:h-4 xs:w-3 fill-white" alt="Icon" />
                                <label
                                    htmlFor="help"
                                    className="text-[#90A3BF] text-[16px] md:text-sm sm:text-sm xs:text-sm font-medium group-hover:text-white">
                                    Help
                                </label>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                <Image src={briefcase} id="logout" className="w-8 h-8 md:h-4 xs:w-3 xs:h-3 sm:w-4 sm:h-4 fill-white" alt="Icon" />
                                <label
                                    htmlFor="darkmode"
                                    className="text-[#90A3BF] text-[16px] md:text-sm sm:text-sm xs:text-sm font-medium group-hover:text-white">
                                    Dark Mode
                                </label>
                                <div className="flex justify-between p-1 items-center sm:w-14 xs:w-16 md:w-16 w-24 sm:h-8 md:h-8 h-10 ml-auto bg-[#F6F7F9] rounded-full">
                                    <div className="w-8 xs:w-4 xs:h-4 h-8 md:h-4 sm:w-4 sm:h-4 p-1 items-center bg-[#3563E9] rounded-full">
                                        <Image src={sun} className="w-full h-full" alt="sun"/>
                                    </div>
                                    <div className="w-8 xs:w-4 xs:h-4 h-8 md:h-4 sm:w-4 sm:h-4 p-1 items-center rounded-full">
                                        <Image src={moon} className="w-full h-full" alt="moon"/>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                    <div className="flex gap-3 px-4 py-4 mt-60 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                        <Image src={logout} id="logout" className="w-8 h-8 xs:w-3 xs:h-3 md:h-4 sm:w-4 sm:h-4 fill-white" alt="Icon" />
                        <label
                            htmlFor="logout"
                            className="text-[#90A3BF] text-[16px] md:text-sm sm:text-sm xs:text-sm font-medium group-hover:text-white">
                            Log Out
                        </label>
                    </div>
                </div>
            </main >
       
      ):(
      <div className="w-full relative bg-white h-auto px-4 py-6 ">
        <RxCross1 onClick={handlemenu}  className='absolute top-2 right-2 text-2xl' />

                
      <div className="flex flex-col bg-white gap-6">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-xs py-4">TYPE</p>
          <div className="h-auto flex flex-col gap-6  ">
           <div className="flex items-center xs:text-[10px] sm:text-[10px] text-sm xs:gap-1 sm:gap-1 gap-3">
           <Link href={linkHref}>
           <input id="Sport-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={ischeked} onClick={()=>{setischeked(!ischeked)}} type="checkbox"></input></Link>
           
           <label htmlFor="Sport-checkbox" className="cursor-pointer">Sport</label>
           
           <p className="text-slate-400">(10)</p>
           </div> 
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="SUV-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={issuv}  onClick={()=>{setsuv(!issuv)}} type="checkbox"></input></Link>
           <label htmlFor="SUV-checkbox" className="cursor-pointer">SUV</label>
           <p className="text-slate-400">(12)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="mpv-checkbox" className="h-3 w-3 rounded-lg" type="checkbox"></input></Link>
           <label htmlFor="mpv-checkbox" className="cursor-pointer">MPV</label>
           <p className="text-slate-400">(16)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="Sudan-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={issudan} onClick={()=>{setsudan(!issudan)}} type="checkbox"></input></Link>
           <label htmlFor="Sudan-checkbox" className="cursor-pointer">Sudan</label>
           <p className="text-slate-400">(20)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="Coupe-checkbox" className="h-3 w-3 rounded-lg" type="checkbox"></input></Link>
           <label htmlFor="Coupe-checkbox" className="cursor-pointer">Coupe</label>
           <p className="text-slate-400">(14)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="Hatchback-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={ishb}  onClick={()=>{sethb(!ishb)}} type="checkbox"></input></Link>
           <label htmlFor="Hatchback-checkbox" className="cursor-pointer">Hatchback</label>
           <p className="text-slate-400">(14)</p>
           </div>  
          
          </div>
      </div>
      <div className="flex flex-col gap-6 my-12">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-xs py-4 ">CAPASITY</p>
          <div className="h-auto flex flex-col gap-6 ">
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="2-checkbox" className="h-3 w-3 rounded-lg" onChange={handletrigr} onFocus={()=>{setValue(70)}} checked={twop} onClick={()=>{setTwop(!twop)}} type="checkbox"></input></Link>
           <label htmlFor="2-checkbox" className="cursor-pointer">2 people</label>
           <p className="text-slate-400">(10)</p>
           </div> 
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="4-checkbox" className="h-3 w-3 rounded-xl" onChange={handletrigr} onFocus={()=>{setValue(70)}} checked={fourp}  onClick={()=>{setFourp(!fourp)}} type="checkbox"></input></Link>
           <label htmlFor="4-checkbox" className="cursor-pointer">4 people</label>
           <p className="text-slate-400">(14)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="6-checkbox" className="h-3 w-3 rounded-lg" onChange={handletrigr} onFocus={()=>{setValue(70)}} checked={sixp} onClick={()=>{setSixp(!sixp)}} type="checkbox"></input></Link>
           <label htmlFor="6-checkbox" className="cursor-pointer">6 people</label>
           <p className="text-slate-400">(12)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-sm gap-3">
           <Link href={linkHref}>
           <input id="8-checkbox"  className="h-3 w-3 rounded-lg" type="checkbox"></input></Link>
           <label htmlFor="8-checkbox" className="cursor-pointer">8 orMore</label>
           <p className="text-slate-400">(16)</p>
           </div>
          
           
          </div>
      </div>
      <div className="w-full">
      <div className="flex flex-col w-full gap-6 my-12">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-[12px] py-4 ">PRICE</p>
          <div className="h-2 flex flex-col w-full gap-8  ">
          <Link href={linkHref}>
          <Rangeslid className='h-2 xs:w-[100px]'  min={0}  max={100} value={value} onChange={setValue} bufferd={0}
          
          /></Link>
          <p className='text-sm '>Max${value}.00</p>
           </div>
          
           </div>
          
      </div>
  </div>) }
    </div>
  )}
  </div> 
         
    )
}

