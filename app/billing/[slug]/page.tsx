"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { client } from "@/sanity/lib/client";
import {client as sanityClient} from "@/sanityClient"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Select } from "../../../components/ui/select"
import {
    
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
  } from "../../../components/ui/select"
import ReviewStar from "@/public/images/ReviewStar.svg"  

import { urlFor } from "@/sanity/lib/image";
import React from "react";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { BrowserRouter as Router } from 'react-router-dom';





interface PostProps {
    name: string;
    slug: { current: string };
    catagory: string;
    image: string;
    fuel: string;
    handle: string;
    capasity: string;
    price: string;
    secondprice: string;
    carvalue : string
  }

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Billing = ({params}: {params: {slug : string}}) => {
    const [post, setPost] = useState<PostProps | null>(null);
    const paySub = false
    
    

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

   
    
    
    const query3 = `*[_type == "cars"  && slug.current == "${params.slug}" ]{
        name,
        slug,
        catagory,
        image,
        fuel,
        handle,
        capasity,
        price,
        secondprice,
        carvalue
      }`;

    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const sanitydata3 = await client.fetch(query3);
            console.log(sanitydata3[0]); 
      
            
            setPost(sanitydata3[0]); 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        
        fetchData();
      }, [params.slug]);
      const pr : string | undefined = post?.price?.slice(0,6);
 

  
    // Define the async function inside useEffect
    const carupdates = async (): Promise<void> => {
      try {
        // Sanity document create karte hain
        
          if (!post?.slug || !post?.name || !post?.price || !post?.image) {
            console.error("Required fields missing!");
            return;
          }
        await sanityClient.create({
          _type: "carupdate",
          slug: post?.slug.current,
          name: post?.name,
          catagory: post?.catagory || "default",
          capasity: post?.capasity || "default",
          price: Number(post?.price),
          secondprice: Number(post?.secondprice) || 0,
          handle: post?.handle,
          image: post?.image,
          fuel: post?.fuel || "unknown",
          carvalue: post?.carvalue || 0,
          createdAt: new Date().toISOString(),
        });
      

        console.log("Car added successfully!");
      } catch (error) {
        console.error("Error creating car update:", error);
        // Optionally, you can throw an error here to handle it elsewhere
      }
    };

    // Call the async function inside useEffect
    carupdates();
  
 // Dependenc
    
      return (
        < div className="flex gap-12 xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-col-reverse xl:flex-col-reverse bg-[#F6F7F9] xs:px-4 xs:py-4  sm:px-6 sm:py-6 md:px-6 md:py-6 px-10 py-10">
        <div className=" xl:w-full xs:w-full sm:w-full lg:w-full md:w-full w-2/3">   
        <div className="px-6 py-8 xs:py-2 sm:py-2 bg-white rounded-xl  ">
            <div className="flex justify-between my-6 ">
            <div>
                <p className="text-3xl sm:text-2xl xs:text-xl font-bold">Billing Info</p>
                <p className="text-slate-400 xs:text-xs sm:text-sm text-lg">Please enter your billing info</p>
            </div>
            <div className="flex items-end">
            <p className="text-slate-400 xs:text-sm sm:text-[16px] text-xl">Step 1 of 4</p>
            </div>
            </div>
            <div className="grid grid-cols-2 xs:flex xs:grid-cols-none sm:flex sm:grid-cols-none md:flex md:grid-cols-none lg:flex lg:grid-cols-none flex-col gap-x-10  grid-rows-2">
                <div className="my-3">
                <label className="text-2xl sm:text-lg xs:text-lg my-2 block">Name</label>
                <input className="px-6 py-5 w-full xs:py-3  rounded-xl bg-[#F6F7F9]" typeof="text" placeholder="Yourname"></input>
                </div>
                <div className="my-3">
                <label className="text-2xl sm:text-lg xs:text-lg my-2 block">Phone Number</label>
                <input className="px-6 py-5 w-full xs:py-3 rounded-xl bg-[#F6F7F9]" typeof="text" placeholder="Phonenumber"></input>
                </div>
                <div className="my-3">
                <label className="text-2xl sm:text-lg xs:text-lg my-2 block">Address</label>
                <input className="px-6 py-5 w-full xs:py-3 rounded-xl bg-[#F6F7F9]" typeof="text" placeholder="Address"></input>
                </div>
                <div className="my-3">
                <label className="text-2xl sm:text-lg xs:text-lg my-2 block ">Town / City</label>
                <input className="px-6 py-5 w-full xs:py-3 rounded-xl bg-[#F6F7F9]" typeof="text" placeholder="Town or City"></input>
                </div>
            </div>

        </div>
        <div className="px-6 sm:py-2 xs:py-2 sm:pb-6 xs:pb-6 py-8 my-10 bg-white rounded-xl  ">
        <div className="flex justify-between my-6 ">
            <div>
                <p className="text-3xl sm:text-2xl xs:text-xl font-bold">Rental Info</p>
                <p className="text-slate-400 xs:text-xs sm:text-sm text-lg">Please your rental date</p>
            </div>
            <div className="flex items-end">
            <p className="text-slate-400 xs:text-sm sm:text-[16px] text-xl">Step 2 of 4</p>
            </div>
          
            </div>
            <div className="flex my-6 items-center"><input type="radio" name="dot" className="h-5 w-5 mr-2" ></input>
          <p className="font-bold xs:text-lg text-xl">Pick-Up</p>
          </div>
          <div className="grid grid-cols-2 xs:flex xs:grid-cols-none sm:flex sm:grid-cols-none md:flex md:grid-cols-none lg:flex lg:grid-cols-none flex-col gap-x-10 grid-rows-2">
          <div>
          <label className="text-2xl my-2 xs:text-lg sm:text-lg block">Locations</label>
          <Select >
            <SelectTrigger className="w-full bg-[#F6F7F9] px-6 rounded-xl py-8 xs:py-6  border-none focus:outline-none active:outline-none text-slate-400 ">
  
              <SelectValue className=" px-6" placeholder="Select your city" />
    
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Karachi</SelectItem>
              <SelectItem value="dark">Lahore</SelectItem>
              <SelectItem value="system">Quetta</SelectItem>
              <SelectItem value="hh">Islamabad</SelectItem>
            </SelectContent>
          </Select>
          </div>
          <div className="">
                <label className="text-2xl xs:text-lg sm:text-lg my-2 block">Date</label>
                <input className="px-6 py-5 w-full xs:py-3  rounded-xl bg-[#F6F7F9]" type="date" placeholder="Select your date" ></input>
        </div>
        <div className="">
                <label className="text-2xl xs:text-lg sm:text-lg my-2 block">Time</label>
                <input className="px-6 py-5 xs:py-3 w-full  rounded-xl bg-[#F6F7F9]" type="time" placeholder="Select your date" ></input>
        </div>
        </div>
        <div className="flex my-6 mt-9 items-center"><input type="radio" name="dot" className="h-5 w-5 mr-2" ></input>
          <p className="font-bold xs:text-lg text-xl">Drop-Off</p>
          </div>
          <div className="grid grid-cols-2 xs:flex xs:grid-cols-none sm:flex sm:grid-cols-none md:flex md:grid-cols-none lg:flex lg:grid-cols-none flex-col gap-x-10 grid-rows-2">
          <div>
          <label className="text-2xl xs:text-lg sm:text-lg my-2 block">Locations</label>
          <Select >
            <SelectTrigger className="w-full bg-[#F6F7F9] px-6 rounded-xl py-8 xs:py-6   border-none focus:outline-none active:outline-none text-slate-400 ">
  
              <SelectValue className=" px-6" placeholder="Select your city" />
    
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Karachi</SelectItem>
              <SelectItem value="dark">Lahore</SelectItem>
              <SelectItem value="system">Quetta</SelectItem>
              <SelectItem value="hh">Islamabad</SelectItem>
            </SelectContent>
          </Select>
          </div>
          <div className="">
                <label className="text-2xl xs:text-lg sm:text-lg my-2 block">Date</label>
                <input className="px-6 py-5 xs:py-3 w-full  rounded-xl bg-[#F6F7F9]" type="date" placeholder="Select your date" ></input>
        </div>
        <div className="">
                <label className="text-2xl xs:text-lg sm:text-lg my-2 block">Time</label>
                <input className="px-6 py-5 xs:py-3 w-full  rounded-xl bg-[#F6F7F9]" type="time" placeholder="Select your time" ></input>
        </div>
        </div>

        </div>
        <Router>
        <Elements stripe={stripePromise}    options={{
          mode: "payment",
          amount: convertToSubcurrency(Number(post?.price ? post.price : "1")),
          currency: "usd",
        }} >
        <CheckoutPage onCarsell={carupdates} paySub={paySub} amount={Number(post?.price)}/>
        </Elements>
        </Router>
        
      

        </div>
        <div className="px-3 py-3 xs:w-full sm:w-full w-1/3 md:w-full lg:w-full xl:w-full h-max  bg-white rounded-xl">
            <div className="mb-10 ">
                <p className="text-3xl 2xl:text-2xl xs:text-xl sm:text-2xl font-bold">Rental Summary</p>
                <p className="text-slate-400 md:text-sm xs:text-xs sm:text-sm text-lg">Prices may change depending on the length of the rental and the price of your rental car.</p>
            </div>
            <div className="my-8 gap-4 xs:gap-2 flex">
                <div className="w-[195px] 2xl:w-[175px] sm:w-[150px] xs:w-[120px] xs:h-[97px] sm:h-[125px] 2xl:h-[145px]  h-[158px]">
                <div style={{
                  backgroundImage: "url(/images/ViewA.jpg)",  
                  backgroundSize: "cover",
                  
                  
                  
                }} className="2xl:pr-6 w-full h-full flex justify-center items-center">
                <Image tabIndex={0} width={180} height={150} src={post?.image ? urlFor(post.image).url() : ''} className="pl-[7%] lg:pl-[10%] lg:w-[220px] md:pl-[8%] md:w-[220px] xl-pl-[17%] xl:w-[300px] 2xl:pl-[13%] 2xl:w-[260px]" alt="car"/>
                </div>
                </div>
                <div className="">
                        <p className="text-4xl 2xl:text-3xl xs:text-lg sm:text-2xl font-bold">{post?.name}</p>
                        <div className=" flex justify-center xs:flex-col-reverse xs:justify-start sm:justify-start 2xl:justify-start items-center xs:my-1 my-2">
                        <Image className="inline-block xs:my-1 xs:w-12 sm:w-14 2xl:w-14" src={ReviewStar} alt="" />
                        <p className="inline-block px-2 xs:px-0 2xl:pl-[2px] xs:static relative xs:text-xs sm:text-sm 2xl:text-sm top-[3px]">440+ Reviewer</p></div>
                    </div>
            </div>
            <hr className="my-4" />
            <div>
                <div className="flex justify-between py-4 xs:text-sm xl:text-xl text-lg">
                    <p className="text-slate-400">Subtotal</p>
                    <p>{pr}</p>
                </div>
                <div className="flex justify-between py-4 xs:text-sm xl:text-xl text-lg">
                    <p className="text-slate-400">Tax</p>
                    <p>$0</p>
                </div>
                <div className="px-12 xs:px-6 xs:py-4 py-6 flex justify-between gap-4 items-center rounded-xl  bg-[#F6F7F9]">
                    <input placeholder="Apply promo code" className="bg-[#F6F7F9]  focus:outline-none text-slate-400 2xl:text-sm xs:text-xs sm:text-xs"/>
                    <p className="cursor-pointer text-xl sm:text-sm 2xl:text-lg xs:text-xs font-bold">Apply now</p>
                </div>
                <div className="flex justify-between items-center">
                <div className="my-6">
                <p className="text-3xl 2xl:text-2xl xs:text-sm sm:text-xl font-bold">Total Rental Price</p>
                <p className="text-slate-400 xs:text-xs xs:w-32 sm:text-xs md:text-xs 2xl:text-xs">Overall price and includes rental discount</p>
                </div>
                <p className="text-5xl md:text-3xl xs:text-2xl  sm:text-2xl 2xl:text-3xl">{"$"+pr}</p>


                </div>
            </div>


        </div>
        </div>
      )

}

export default Billing