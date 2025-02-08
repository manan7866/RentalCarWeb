"use client"

import React, { useContext , useEffect} from 'react'
import { CartContext } from '@/context/CartContext';

import Products from '@/components/Products';
import { urlFor } from '@/sanity/lib/image';
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Link from 'next/link';


const Cartpage = () => {
    const { favCars , setFavCars} = useContext(CartContext);
    
    useEffect(() => {
        const storedFavCars = localStorage.getItem("favCars");
        if (storedFavCars) {
          console.log("Fetched from localStorage:", JSON.parse(storedFavCars));
          setFavCars(JSON.parse(storedFavCars));
        
        }
      }, [])

    
  return (
    <div className='w-full h-[1000px] grid grid-cols-4 gap-x-10 bg-slate-200 py-36 px-10 '>
        
      {favCars.map((item )=>{
        console.log("items",item);
        
        return (
            <div key={"any"} className=''>
                {item.map((car)=>{
                    console.log("cars",car);
                    
                    return(
                        <div key={car.slug.current} className='bg-white rounded-lg absolute px-6'>
                            <div className='relative top-12 left-64 ' onClick={()=>{ const updatedFavCars = favCars.filter((favCar) => JSON.stringify(favCar[0].slug) !== JSON.stringify(car.slug));
                                     setFavCars(updatedFavCars);
                                     localStorage.setItem("favCars", JSON.stringify(updatedFavCars));}} >
                               {car.fav ? (<IoHeart  className="text-3xl text-red-500" />) : 
                               (<IoHeartOutline  className="text-3xl text-slate-300" />)}
                            </div>
                           <Products name={car.name} catagory={car.catagory} image={urlFor(car.image).url()} fuel={car.fuel} capasity={car.capasity} price={car.price} />
                           <Link href={`/billing/${car?.slug.current}`} legacyBehavior>
                           <a className="my-link-class" target="_blank" rel="noopener noreferrer">
                           <button className='bg-blue-500 py-4 my-3 text-xl rounded-lg w-full'>Rent now</button></a></Link>
                        </div>
                    )

                })}
                
            </div>
        )
      })} 


      {favCars.length == 0 ? (<p className='text-2xl mx-10'>No items Selected</p>) : ""}
    </div>
  )
}

export default Cartpage
