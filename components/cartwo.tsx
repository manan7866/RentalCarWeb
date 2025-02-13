"use client"

import { IoHeartOutline } from "react-icons/io5";
import Image from "next/image";
import gas from "@/public/images/gas.svg";
import people from "@/public/images/people.png";
import drive from "@/public/images/drive.svg";

import { IoHeart } from "react-icons/io5";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";



interface CarProps {
  carname: string;
  carcategory: string;
  carpic: string;
  carfuel: string;
  cardrive: string;
  carcapasity: string;
  carprice: string;
  carptwo?: string;
  className? : string;
  link : string ;
  link2 : string,
  isFav: boolean;
  onFavToggle: () => void;
  
}

export default function Cartagtwo({
  carname,
  carcategory,
  carpic,
  carfuel,
  cardrive,
  carcapasity,
  carprice,
  carptwo = "",
  className,
  link,
  link2,
  isFav,
  onFavToggle
  
  
}: CarProps) {
    

  return (
    <div  className={`h-auto lg:h-auto  w-full bg-white px-6 py-6 rounded-md ${className}`}>
      <div className="flex justify-between">
        <p className="text-2xl  xs:text-xl font-bold">{carname}</p>
        <div onClick={()=>{ 
          {onFavToggle()}}
          
          }>
          {isFav ? (<IoHeart  className="text-3xl text-red-500" />) :
          (<IoHeartOutline  className="text-3xl text-slate-300" />)}
        
        </div>
      </div>
      <p className="text-slate-300">{carcategory}</p>
      <div className="lg:flex  lg:justify-center lg:gap-20  sm:flex xs:items-center sm:items-center xs:flex md:flex xs:justify-between md:justify-center md:gap-20">
      <Link href={link2 || ""} legacyBehavior>
      <div className="h-[180px] md:h-[40%] xs:h-[40%] sm:h-[40%] lg:h-[40%] flex 2xl:mr-20 items-center">
      
        <Image src={urlFor(carpic).url()} width={220} height={0} layout="intrinsic" alt="carpic" className="2xl:w-[200px] xs:h-14 xs:w-[140px] sm:h-20 md:h-40 lg:h-44" />
      </div></Link>
      <div className="flex justify-between lg:flex-col  lg:my-6 lg:mt-3 md:flex-col sm:flex-col xs:flex-col xs:my-4  md:my-6 md:mt-3 sm:my-6 sm:mt-3 text-slate-300">
        <div className="flex 2xl:flex-col xs:text-[10px] sm:text-sm ">
          <Image src={gas} alt="" className="sm:h-4 sm:w-4 xs:h-3 xs:w-3" />
          {carfuel + "L"}
        </div>
        <div className="flex 2xl:flex-col sm:text-sm sm:my-2 xs:my-2 xs:text-[10px] mlg:justify-center  ">
          <Image src={drive} alt="" className="sm:h-4 sm:w-4 xs:h-3 xs:w-3" />
          {cardrive}
        </div>
        <div className="flex  2xl:flex-col xs:text-[10px]  sm:text-sm ">
          <Image className="sm:h-4 sm:w-4 xs:h-3 xs:w-3" src={people} alt="" />
          {carcapasity + " People"}
        </div>
      </div>
      </div>
      
      <div className="flex justify-between items-center h-auto">
        <div className="flex items-start text-2xl xs:text-lg font-bold relative top-3">
          <div>
          {"$"+carprice + ".00/"}
          <div className='text-slate-300 text-lg  xs:text-sm  line-through '>{ carptwo ?"$" +carptwo+ ".00" : ""}</div> 
          </div><p className="text-slate-300 my-2 text-sm font-normal text-end pl-1">day</p>
        </div>
        <Link href={link || ""} legacyBehavior>
        <a className="my-link-class" target="_blank" rel="noopener noreferrer">
        <button  className="w-[144px] xl:w-[120px] 2xl:w-[100px] 2xl:text-sm xs:text-xs xs:w-[70px] xs:h-[30px] h-[50px] text-xl bg-blue-400 rounded-md text-white md:mt-2 lg:mt-2 mt-8">
          Rental Now
        </button></a></Link>
      </div>
      
    </div>
  );
}
