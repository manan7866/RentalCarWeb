
import Image from 'next/image'
import React from 'react'
import { BsFuelPumpFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { LuBadgeDollarSign } from "react-icons/lu";


interface productType{
    id? : number,
    name : string,
    catagory : string,
    image : string ,
    fuel? : string,
    handle? : string,
    capasity? : string,
    price : number,
    secondprice? : string,
    carvalue? : string,

}

const Products  = ({name , catagory , image , fuel, capasity ,price} : productType) => {
  return (
    <div className='w-full  py-4 px-8'>
        <p className='text-xl py-2'>{name}</p>
        <p className='text-lg text-slate-400'>{catagory}</p>
        <div className='py-2 w-full flex justify-center items-center'>
            <Image src={image} width={200} height={0} alt='Car image' className='w-[60%] my-8' />
        </div>
        <div className='py-4 text-slate-400 flex justify-evenly'>
            <div className='flex items-center gap-1'> <BsFuelPumpFill />{fuel}</div>
            <div className='flex items-center gap-1'><BsFillPeopleFill />{capasity}</div>
            <div className='flex items-center gap-1'><LuBadgeDollarSign />{price + ".00"}</div>
        </div>
      
    </div>
  )
}

export default Products
