"use client"


import Pickup from '@/components/Pickup';
import Dropoff from '@/components/Pickdown';
import { LuArrowUpDown } from "react-icons/lu";

import Cartwo from "@/components/cartwo"
import { FilterContext } from '@/context/FilterContext';
import { useEffect ,useState } from "react";
import { client } from "@/sanity/lib/client";
import React, { useContext } from 'react'
import Rangeslid from "@/components/Slid"

import { CartContext } from '@/context/CartContext';



interface PostProps {
  name: string;
  slug: { current: string };
  category: string;
  image: string;
  fuel: string;
  handle: string;
  capasity: string;
  price: string;
  secondprice: string;
}

export default function Category (){
  // const [value, setValue] = useState(70);
  const [data, setData] = useState<PostProps[] >([]);
  const [data2, setData2] = useState<PostProps[] >([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState([])
  const [data7, setData7] = useState([])
  const [dataRange, setDataRange] = useState([])
  
  const [carArry , setCararry] = useState<PostProps[][]>([])
  
  
  
  const { twop, setTwop, fourp, setFourp, sixp, setSixp ,ischeked , setischeked,issuv , setsuv, issudan , setsudan ,ishb , sethb ,value, setValue ,trigr, setTrigr }= useContext(FilterContext);
  const { favCars, setFavCars } = useContext(CartContext);
  
  useEffect(() => {
    const storedFavCars = localStorage.getItem("favCars");
    if (storedFavCars) {
      console.log("Fetched from localStorage:", JSON.parse(storedFavCars));
      setFavCars(JSON.parse(storedFavCars));
    }
  }, [])
  const handletrigr = ()=>{
    setTrigr(!trigr)
  }
  
  



  useEffect(() => {
    
    
    const fetchdata = async () => {
      

if (ischeked ) {
  const query2 = `*[ _type == "cars" && category == "Sport" ]{
    name, slug, category, image, fuel, handle, capasity, price, secondprice
  }`;

  if (!twop && !fourp && !sixp && value === 70) {
    const sanitydata = await client.fetch(query2);

    
    if (Array.isArray(sanitydata)) {
      
      const newData = sanitydata.filter(
        (newItem) => !carArry.some((existingItem) => JSON.stringify(existingItem) === JSON.stringify(newItem))
      );

      // If new data exists, add it to carArry
      if (newData.length > 0) {
        setCararry([])
        setData(newData);
        setCararry((prev) => [...prev, ...[newData]]); // Add new data to carArry
      }
    }
  } else {
    
    setCararry((prev) => prev.filter((arr) => arr !== data));
  }
} else {
  
  setData([]);
  if (carArry.length > 0) {
    setCararry([]); 
  }
}

 
 
 if (issuv){
  const query2 = `*[ _type == "cars" && category == "SUV" ]{
    name,
    slug,
    category,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice
  }`
  if(!twop && !fourp && !sixp){
  setCararry((prev) => prev.filter((arr) => arr !== data2));
      const sanitydata2 = await client.fetch(query2)
      
      
      
      
      if (Array.isArray(sanitydata2)) {
        
        const newData = sanitydata2.filter(
          (newItem) => !carArry.some((existingItem) => JSON.stringify(existingItem) === JSON.stringify(newItem))
        );
        ;
        
        if (!carArry.find((arr) => (arr) === (newData))) {
          
          ;
          if (newData.length > 0){
            setData2([])
            setData2(newData)
            setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(newData)));
            setCararry((p) => p ? [...p, newData] : [newData]);
          }
          
          ;
        }
      }
      
      
  }else{
    setCararry((prev) => prev.filter((arr) => arr !== data2));
  }
    
    
   
    
    
 }else 
 {setData2([])
  setCararry((prev) => prev.filter((arr) => arr !== data2));
  
  }
  if (issudan){
    const query2 = `*[ _type == "cars" && category == "Sedan"]{
      name,
      slug,
      category,
      image,
      fuel,
      handle,
      capasity,
      price,
      secondprice
    }`
    if(!twop && !fourp && !sixp){  
    setCararry((prev) => prev.filter((arr) => arr !== data3));
        const sanitydata3 = await client.fetch(query2)
        
        setData3(sanitydata3)
        setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(sanitydata3)));
        setCararry((p) => p ? [...p, sanitydata3] : [sanitydata3]);
        
    }else{
      setCararry((prev) => prev.filter((arr) => arr !== data3));
    }
      
      
     
      
      
   }else 
   {setData3([])
    setCararry((prev) => prev.filter((arr) => arr !== data3));
    
    }
    if (ishb){
      const query2 = `*[_type == "cars" && category == "Hatchback"]{
        name,
        slug,
        category,
        image,
        fuel,
        handle,
        capasity,
        price,
        secondprice
      }`
      if(!twop && !fourp && !sixp){  
      setCararry((prev) => prev.filter((arr) => arr !== data4));
          const sanitydata4 = await client.fetch(query2)
          
          setData4(sanitydata4)
          setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(sanitydata4)));
          setCararry((p) => p ? [...p, sanitydata4] : [sanitydata4]);
          
        
      }else{
        setCararry((prev) => prev.filter((arr) => arr !== data4));
      }
        
       
        
        
     }else 
     {setData4([])
      setCararry((prev) => prev.filter((arr) => arr !== data4));
      
      }
      if (twop){
        const query2 = `*[_type == "cars" && capasity == "2"]{
          name,
          slug,
          category,
          image,
          fuel,
          handle,
          capasity,
          price,
          secondprice
        }`
          
        setCararry((prev) => prev.filter((arr) => arr !== data5));
            const sanitydata5 = await client.fetch(query2)
            
            setData5(sanitydata5)
            setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(sanitydata5)));
            setCararry((p) => p ? [...p, sanitydata5] : [sanitydata5]);
            
          
          
          
         
          
          
       }else 
       {setData5([])
        setCararry((prev) => prev.filter((arr) => arr !== data5));
        
        }
        if (fourp){
          const query2 = `*[_type == "cars" && capasity == "4" ]{
            name,
            slug,
            category,
            image,
            fuel,
            handle,
            capasity,
            price,
            secondprice
          }`
            
          setCararry((prev) => prev.filter((arr) => arr !== data6));
              const sanitydata6 = await client.fetch(query2)
              
              setData6(sanitydata6)
              setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(sanitydata6)));
              setCararry((p) => p ? [...p, sanitydata6] : [sanitydata6]);
              
            
            
            
           
            
            
         }else 
         {setData6([])
          setCararry((prev) => prev.filter((arr) => arr !== data6));
          
          }
          if (sixp){
            const query2 = `*[_type == "cars" && capasity == "6"]{
              name,
              slug,
              category,
              image,
              fuel,
              handle,
              capasity,
              price,
              secondprice
            }`
              
            setCararry((prev) => prev.filter((arr) => arr !== data7));
                const sanitydata7 = await client.fetch(query2)
                
                setData5(sanitydata7)
                setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(sanitydata7)));
                setCararry((p) => p ? [...p, sanitydata7] : [sanitydata7]);
                
              
              
              
             
              
              
           }else 
           {setData7([])
            setCararry((prev) => prev.filter((arr) => arr !== data7));
            
            }
            if (value > 70){
              const query2 = `*[_type == "cars" && price == $value]{
                name,
                slug,
                category,
                image,
                fuel,
                handle,
                capasity,
                price,
                secondprice
              }`
              setCararry([])
              setCararry((prev) => prev.filter((arr) => arr !== dataRange));
                  const sanitydataRa = await client.fetch(query2,{
                    value: value.toString()})
                  
                  setDataRange(sanitydataRa)
                  setCararry((prev) => prev.filter((arr) => JSON.stringify(arr) !== JSON.stringify(sanitydataRa)));
                  setCararry((p) => p ? [...p, sanitydataRa] : [sanitydataRa]);
                  
                
                
                
               
                
                
             }else 
             {setDataRange([])
              setCararry((prev) => prev.filter((arr) => arr !== dataRange));
              
              }
}
fetchdata()

  
  
  }, [trigr ,value  ])
 
  
    return (
        <div className="w-full flex relative  bg-[#E0E9F4] h-full ">
            <div className="w-[450px] lg:hidden md:hidden xs:hidden sm:hidden bg-white h-auto px-8 py-10 ">
                
            <div className="flex flex-col bg-white gap-6">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-xs py-4">TYPE</p>
          <div className="h-auto flex flex-col gap-6  ">
           <div className="flex items-center xs:text-[10px] sm:text-[10px] text-lg xs:gap-1 sm:gap-1 gap-3">
           <input  id="Sport-checkbox" onFocus={()=>{setValue(70)}} className="h-3 w-3 rounded-lg" onChange={handletrigr} checked={ischeked}    onClick={()=>{setischeked(!ischeked)}} type="checkbox"></input>
           <label htmlFor="Sport-checkbox" className="cursor-pointer">Sport</label>
           <p className="text-slate-400">(10)</p>
           </div> 
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="SUV-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={issuv}   onClick={()=>{setsuv(!issuv)}} type="checkbox"></input>
           <label htmlFor="SUV-checkbox" className="cursor-pointer">SUV</label>
           <p className="text-slate-400">(12)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="mpv-checkbox" className="h-3 w-3 rounded-lg" type="checkbox"></input>
           <label htmlFor="mpv-checkbox" className="cursor-pointer">MPV</label>
           <p className="text-slate-400">(16)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="Sudan-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={issudan} onClick={()=>{setsudan(!issudan)}} type="checkbox"></input>
           <label htmlFor="Sudan-checkbox" className="cursor-pointer">Sudan</label>
           <p className="text-slate-400">(20)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="Coupe-checkbox" className="h-3 w-3 rounded-lg" type="checkbox"></input>
           <label htmlFor="Coupe-checkbox" className="cursor-pointer">Coupe</label>
           <p className="text-slate-400">(14)</p>

           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="Hatchback-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={ishb} onClick={()=>{sethb(!ishb)}} type="checkbox"></input>
           <label htmlFor="Hatchback-checkbox" className="cursor-pointer">Hatchback</label>
           <p className="text-slate-400">(14)</p>
           </div>  
          
          </div>
      </div>
      <div className="flex flex-col gap-6 my-12">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-xs py-4 ">CAPASITY</p>
          <div className="h-auto flex flex-col gap-6 ">
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="2-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onClick={()=>{setTwop(!twop)}} checked={twop} onChange={handletrigr}  type="checkbox"></input>
           <label htmlFor="2-checkbox" className="cursor-pointer">2 people</label>
           <p className="text-slate-400">(10)</p>
           </div> 
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="4-checkbox" className="h-3 w-3 rounded-xl" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={fourp} onClick={()=>{setFourp(!fourp)}} type="checkbox"></input>
           <label htmlFor="4-checkbox" className="cursor-pointer">4 people</label>
           <p className="text-slate-400">(14)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="6-checkbox" className="h-3 w-3 rounded-lg" onFocus={()=>{setValue(70)}} onChange={handletrigr} checked={sixp} onClick={()=>{setSixp(!sixp)}} type="checkbox"></input>
           <label htmlFor="6-checkbox" className="cursor-pointer">6 people</label>
           <p className="text-slate-400">(12)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg  gap-3">
           <input id="8-checkbox"  className="h-3 w-3 rounded-lg" type="checkbox"></input>
           <label htmlFor="8-checkbox" className="cursor-pointer">8 orMore</label>
           <p className="text-slate-400">(16)</p>
           </div>
          
           
          </div>
      </div>
                <div>
                <div className="flex flex-col gap-6 my-12">
                    <p style={{letterSpacing: '4px'}} className="text-slate-400 text-sm py-4 ">PRICE</p>
                    <div className="h-auto flex flex-col gap-8  ">
                     
                    <Rangeslid min={0}   max={100} value={value} onChange={setValue} bufferd={0}
                    
                    />
                    <p onFocus={()=>{
                      setischeked(false)
                      setTwop(false)
                    }} className='text-2xl '> Max${value}.00</p>
                     </div>
                    
                     </div>
                    
                </div>
            </div>
            
                <div className=' px-16 lg:px-14 py-6  w-full xs:px-4 xs:py-4 sm:px-6 sm:py-6 md:px-6 md:py-6 h-full'> 
                   <div className='relative flex 2xl:flex-col xs:flex-col xl:flex-col sm:flex-col md:flex-col lg:flex-col 2xl:w-full justify-between md:gap-14 w-full lg:gap-16 xl:gap-16 2xl:gap-16 gap-12 items-center '>
                    <div tabIndex={0} className='relative xl:static xs:static xs:w-full sm:static sm:w-full md:static md:w-full lg:static 2xl:static top-1 focus:z-20  xl:w-full  lg:w-full 2xl:w-full w-full inline-block'><Pickup className='2xl:px-16 md:px-8 xl:px-8 w-full' /></div>
                    <div className="absolute right-[46.9%] sm:right-[41%] md:top-[39%] xs:top-[40%] xs:right-[41%] xl:top-[37%] 2xl:top-[37%] 2xl:h-24 lg:top-[37%] sm:top-[37%]  2xl:w-24 xs:h-16 xs:w-16 xl:h-24  lg:w-24 lg:h-24  xl:w-24 flex justify-center items-center h-20 w-20 z-10 rounded-md bg-blue-500"><LuArrowUpDown className="text-white text-2xl" /></div>
                    <div tabIndex={0} className='relative xl:static xs:static xs:w-full md:static md:w-full sm:static sm:w-ful lg:w-full lg:static 2xl:static 2xl:w-full xl:w-full focus:z-10  bottom-1 w-full inline-block'><Dropoff className='md:px-8 2xl:px-16 xl:px-8 w-full'/></div>
                    
                   </div>
    
<div>
  {carArry.map((c, index) => {
    // Category name (first car in the array)
    const categoryName = c[0]?.category || 'No Category';

    // Capacity labels logic (Unique values using Set)
    const capacityLabels: Set<string> = new Set();

    if (twop) {
      capacityLabels.add(c[0]?.capasity ? `${c[0]?.capasity} People` : '2 People');
    }
    if (fourp) {
      capacityLabels.add(c[0]?.capasity ? `${c[0]?.capasity} People` : '4 People');
    }
    if (sixp) {
      capacityLabels.add(c[0]?.capasity ? `${c[0]?.capasity} People` : '6 People');
      
    }
    if (value > 70) {
      capacityLabels.add(c[0]?.capasity ? `$${c[0]?.price} ` : '');
      
    }

    // Convert Set to Array to map it
    const capacityArray = [...capacityLabels];

    return (
      <div key={index}>
        {/* Render capacity labels at the top if any */}
        {capacityArray.length > 0 && (
          <div>
            {capacityArray.map((label, labelIndex) => (
              <p key={labelIndex} className="capacity-label my-4 text-lg text-slate-400">{label}</p>
            ))}
          </div>
        )}

        {/* If no capacity filter is selected, show the category name */}
        {capacityArray.length === 0 && (
          <p className="category-name my-4 text-lg text-slate-400">{categoryName}</p>
        )}

        {/* Car items rendering */}
        <div className="grid gap-y-6 sm:grid-cols-1 xs:grid-cols-1 grid-cols-3 xl:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-rows-8 2xl:gap-6 lg:gap-4 gap-[90px] pr-0 mt-5">
          {c.map((car, carIndex: number) => {
                  const isFav = favCars.some((favCar) => JSON.stringify(favCar[0].slug) === JSON.stringify(car.slug));
                  const handleFavToggle = () => {
                   
                    if (isFav) {
                      // If the car is already in favorites, remove it
                      const updatedFavCars = favCars.filter((favCar) => JSON.stringify(favCar[0].slug) !== JSON.stringify(car.slug));
                      setFavCars(updatedFavCars); // Update state
                      localStorage.setItem("favCars", JSON.stringify(updatedFavCars)); // Update localStorage
                    } else {
                      // If car is not a favorite, add it
                      const updatedFavCars = [...favCars, [{ ...car, fav: true, price: Number(car.price) }]];
                      setFavCars(updatedFavCars); // Update state
                      localStorage.setItem("favCars", JSON.stringify(updatedFavCars)); // Update localStorage
                    }
                  };
            return (
              <Cartwo isFav={isFav} onFavToggle={handleFavToggle}
                key={carIndex}
                link2={`/detail/${car.slug.current}`}
                link={`/billing/${car.slug.current}`}
                carname={car.name}
                carcategory={car.category}
                carpic={car.image}
                carfuel={car.fuel}
                cardrive={car.handle}
                carcapasity={`${car.capasity}`} 
                carprice={`${car.price}`}
                carptwo={car.secondprice}
              />
            );
          })}
        </div>
      </div>
    );
  })}
  
</div>
















           
            <div className="flex justify-between h-[200px] items-center">
              <div className="bg-[#E0E9F4] h-3 w-3"></div>
            <button className="w-[200px] h-[50px] text-xl xs:text-[14px] xs:w-[120px] sm:text-[16px] sm:w-[140px] bg-blue-500 rounded-md text-white mt-8">Show more Car</button>
            <p className="text-slate-300 text-xl">120Car</p>
            </div>
                   

                </div>
                
        </div>
    )
}