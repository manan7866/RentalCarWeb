"use client"


import { CartContext } from '@/context/CartContext';
import { LuArrowUpDown } from "react-icons/lu";
import { useUser } from "@clerk/clerk-react";

import React, { useContext } from 'react'
import Pickup from "../components/Pickup"
import Dropoff from "../components/Pickdown"
import Car from "../components/Car"
import Cartwo from "../components/cartwo"
import { client } from "../sanity/lib/client";
import { useEffect ,useState } from "react";

interface PostProps {
  name: string;
  slug: {current : string} 
  category: string;
  image: string;
  fuel: string;
  handle: string;
  capasity: string;
  price: string;
  secondprice: string;
  carvalue : string
}

export default  function Home (){
  const [data, setData] = useState<PostProps[]>([]);
  const [data2, setData2] = useState<PostProps[]>([]);
  const { user , isLoaded } =  useUser();; // Clerk ka user object
  const [response, setResponse] = useState(null);
 
  const { favCars, setFavCars } = useContext(CartContext);
  console.log(isLoaded,response );
  
  useEffect(() => {
    const storedFavCars = localStorage.getItem("favCars");
    if (storedFavCars) {
      console.log("Fetched from localStorage:", JSON.parse(storedFavCars));
      setFavCars(JSON.parse(storedFavCars));
    }
  }, [])

    
  
    // useEffect me email ko fetch karna aur backend ko request bhejna
    useEffect(() => {
      const sendEmailToServer = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (user && user.primaryEmailAddress) {
          try {
            const res = await fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: user.primaryEmailAddress }), // Clerk user se email le rahe hain
            });
            console.log(email);
            
            const data = await res.json();
            setResponse(data); // Response ko state me set karenge
          } catch (error) {
            console.error("Error sending email to server:", error);
          }
        }
      };
  
      // Function ko call karenge agar user ka email available ho
      if (user && user.primaryEmailAddress) {
        sendEmailToServer();
      }
    }, [user]);
    
  const query = `*[_type == "cars" && carvalue == "Popular Car" ]{
    name,
    slug,
    category,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice,
    carvalue
  }`
  const query2 = `*[_type == "cars" && carvalue == "Recomendation Car" ]{
    name,
    slug,
    category,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice,
    carvalue
  }`
  useEffect(() => {
    const fetchData = async () => {
      const sanitydata = await client.fetch(query)
      const sanitydata2 = await client.fetch(query2)
      setData(sanitydata)
      setData2(sanitydata2)
      
      
    };
    

    fetchData();
    
  }, []);



  

 
  return (
    <div className="bg-[#E3E3E3] px-20 sm:px-6 sm:py-6 md:px-6 md:py-6 xs:px-4 xs:py-4  py-10 h-auto  w-auto">
      <div className="flex justify-between items-center  w-full">
        <div  className="w-1/2 xl:w-full xs:w-full sm:w-full md:w-full lg:w-full md:h-auto xl:h-auto lg:h-auto h-auto sm:pr-0 pr-5 ">
          <div style={{  backgroundImage: "url('images/bbb.jpg')", backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center", }} className="w-full xl:flex-none  lg:flex-none rounded-xl xs:rounded-lg sm:rounded-lg xl:justify-start lg:h-[500px] md:h-[320px] sm:h-[240px] xs:h-[180px] xl:h-[600px] 2xl:flex 2xl:flex-col  h-[480px] px-6 py-4">
            <div className=" xl:my-5 xs:my-1">
              <p className="text-5xl lg:text-4xl sm:text-xl xs:text-[14px] xs:block sm:block md:text-2xl text-white md:block hidden lg:block xl:block">The Best Platform for Car Rental</p>
            <p className="text-white text-[40px] lg:hidden xs:hidden md:hidden sm:hidden xl:hidden 2xl:text-[26px]  ">The Best Platform </p> 
            <p className="text-white xl:hidden xl:my-3  xs:hidden sm:hidden md:hidden lg:hidden h-auto 2xl:text-[26px]  text-[40px] ">for Car Rental</p></div>
            <p className="text-white lg:leading-[40px] xs:leading-[17px] xl:leading-[50px] sm:text-sm xs:pt-1 pt-4 xl:text-3xl lg:text-2xl xs:text-[11px]  text-xl font-extralight">Ease of doing a car rental safely and <br/> reliably.Of course at a low price.</p>
            <a href="detail/car-1" className="my-link-class" target="_blank" rel="noopener noreferrer">
            <button className="w-[144px] xl:h-[90px] lg:h-[60px] lg:w-[200px] sm:w-[80px] xs:w-[65px] xs:h-[30px] sm:h-[30px] md:w-[120px] md:h-[35px] xs:text-[12px] sm:text-sm md:text-lg xl:w-[250px] 2xl:w-[110px] 2xl:text-lg 2xl:mb-20 h-[50px] text-2xl bg-blue-600 rounded-md text-white xs:mt-2 mt-8">RentalCar</button></a>
            
            
          </div>
        </div>
        <div  className=" w-1/2 pl-5 md:hidden sm:hidden xs:hidden lg:hidden xl:hidden">
        <div style={{backgroundImage: "url('images/abn.jpg')",  backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center" }} className="w-full 2xl:flex rounded-xl 2xl:flex-col  h-[480px] pl-6 py-4">
            <p className="text-white 2xl:text-[26px] text-[40px] ">Easy way to rent a </p> 
            <p className="text-white 2xl:text-[26px] text-[40px] ">car at a low price</p>
            <p className="text-white pt-4 2xl:text-lg text-xl font-extralight">Providing cheap car rental services <br/> and safe and comfortable facilities.</p>
            <a href="detail/car-2" className="my-link-class" target="_blank" rel="noopener noreferrer">
            <button className="w-[144px] 2xl:w-[110px] 2xl:text-lg 2xl:mb-20  h-[50px] text-2xl bg-blue-400 rounded-md text-white mt-8">RentalCar</button></a>
        </div>
        </div> 
        
      </div> 
      <div className="flex 2xl:gap-4 xl:flex-col relative xl:gap-14 md:flex-col md:gap-14 lg:flex-col lg:gap-14 xs:flex-col xs:gap-8 sm:flex-col sm:gap-14 items-center my-6 justify-between">
        <div tabIndex={0} className="w-[42%] focus:z-10 xs:w-full sm:w-full lg:w-full md:w-full  xl:w-full 2xl:w-[600px]">
        <Pickup className="2xl:px-4 "/></div>
        <div className="flex xl:absolute xs:absolute  sm:absolute lg:absolute md:absolute top-[38%] justify-center items-center xl:h-24 xl:w-24 xs:h-16  xs:w-16 h-20  w-20 rounded-md bg-blue-500"><LuArrowUpDown className="text-white text-2xl" /></div>
        <div tabIndex={0} className="w-[42%] xs:w-full focus:z-10 sm:w-full lg:w-full md:w-full xl:w-full 2xl:w-[600px]"><Dropoff className="2xl:px-4 "/></div>
      </div>
      <div>
        <div className="w-full flex justify-between px-4 py-2 text-lg">
          <p className="text-slate-300">Popular Car</p>
          <a className="text-blue-500">View All</a>
          </div>
           
          {/* <a className="my-link-class" target="_blank" rel="noopener noreferrer"></a> */}
          <div className="flex gap-20 2xl:gap-[2%] xl:gap-4 custom-scroll m2xl:flex-none  grid-cols-4 m2xl:overflow-x-hidden m2xl:gap-[86px] m2xl:grid  overflow-x-auto  justify-between">
            {data?.map((c : PostProps  )=>{
               
            const isFav = favCars.some((favCar) => JSON.stringify(favCar[0].slug) === JSON.stringify(c.slug));
            const handleFavToggle = () => {
             
              if (isFav) {
                // If the car is already in favorites, remove it
                const updatedFavCars = favCars.filter((favCar) => JSON.stringify(favCar[0].slug) !== JSON.stringify(c.slug));
                setFavCars(updatedFavCars); // Update state
                localStorage.setItem("favCars", JSON.stringify(updatedFavCars)); // Update localStorage
              } else {
                // If car is not a favorite, add it
                const updatedFavCars = [...favCars, [{ ...c, fav: true, price: Number(c.price) }]];
                setFavCars(updatedFavCars); // Update state
                localStorage.setItem("favCars", JSON.stringify(updatedFavCars)); // Update localStorage
              }
            };
            // localStorage.removeItem("favCars");
              return(
                   
                    <div key={"any"}>
                      
                  <Car isFav={isFav} onFavToggle={handleFavToggle}  link={`/billing/${c?.slug.current}`} link2={`/detail/${c?.slug.current}`} className="2xl:w-[320px]  xs:w-[260px]"  carname={c.name} carcategory={c.category} carpic={c.image} carfuel={c.fuel} cardrive={c.handle}
                   carcapasity={c.capasity} carprice={c.price} carptwo={c.secondprice} />

</div>

              )
            })}
            </div>
            <div className="w-full flex items-center h-20  justify-between px-4 py-2 text-lg">
          <p className="text-slate-300">Recommended Car</p>
          <a className="text-blue-500"></a>
          </div>
          <div className="grid sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 grid-cols-4 grid-rows-2 lg:grid-rows-8 xl:grid-cols-3 xl:grid-rows-3 xl:gap-4 gap-y-6 mxl:grid-cols-4 mxl:grid-rows-2 2xl:gap-[2%]  m2xl:gap-[86px] h-auto w-full pr-0">
            {data2?.map((c : PostProps )=>{
                  const isFav = favCars.some((favCar) => JSON.stringify(favCar[0].slug) === JSON.stringify(c.slug));
                  const handleFavToggle = () => {
                   
                    if (isFav) {
                      // If the car is already in favorites, remove it
                      const updatedFavCars = favCars.filter((favCar) => JSON.stringify(favCar[0].slug) !== JSON.stringify(c.slug));
                      setFavCars(updatedFavCars); // Update state
                      localStorage.setItem("favCars", JSON.stringify(updatedFavCars)); // Update localStorage
                    } else {
                      // If car is not a favorite, add it
                      const updatedFavCars = [...favCars, [{ ...c, fav: true, price: Number(c.price) }]];
                      setFavCars(updatedFavCars); // Update state
                      localStorage.setItem("favCars", JSON.stringify(updatedFavCars)); // Update localStorage
                    }
                  };
              
              return(
                
                  
                  <Cartwo isFav={isFav} onFavToggle={handleFavToggle} key={c.slug.current} link={`/billing/${c.slug.current}`} link2={`/detail/${c.slug.current}`}  carname={c.name} carcategory={c.category} carpic={c.image} carfuel={c.fuel} cardrive={c.handle}
                   carcapasity={c.capasity} carprice={c.price} carptwo={c.secondprice} />

               

              )
            })}
            </div>
            <div className="flex justify-between h-[200px] items-center">
              <div className="bg-[#E0E9F4] h-3 w-3"></div>
              <a href="/category">
            <button className="w-[200px] h-[50px] text-xl xs:text-[14px] xs:w-[120px] sm:text-[16px] sm:w-[140px] bg-blue-500 rounded-md text-white mt-8">Show more Car</button></a>
            <p className="text-slate-300 text-xl">120Car</p>
            </div>
          
      </div>
      

    </div>
  )
}
   
    
    
    
    

