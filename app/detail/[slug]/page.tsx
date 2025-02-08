"use client" 
import { FaUserCircle } from "react-icons/fa";

import Car from "../../../components/Car"
import { FilterContext } from '../../../context/FilterContext';
import { client as sanityClient } from "@/sanity/lib/client";  
import { useUser } from "@clerk/clerk-react";
import { client as sanityClient2 } from "@/sanityClient";
import { useEffect, useState ,useContext } from "react";
import Image from "next/image";
import Rangeslid from "../../../components/Slid"

import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { CartContext } from '@/context/CartContext';

import { RiArrowDownWideFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import ViewB from "@/public/images/ViewB.png"
import ViewC from "@/public/images/ViewC.jpg"
import { urlFor } from "@/sanity/lib/image";
import React from "react";
import Link from "next/link";




interface Rating {
  createdAt? : string,
  userName : string,
  userImage : string,
  _ref? : string,
  user: string; // User ka naam
  rating: number; // Rating from 1 to 5
  reviewText: string; // Review text
}
interface PostProps {
  _id? : string,
  name: string;
  slug: { current: string };
  catagory: string;
  image: string;
  fuel: string;
  handle: string;
  capasity: string;
  price: string;
  secondprice: string;
  ratings : Rating[]
}

const Detail = ({ params }: { params: { slug: string } }) => {
  
  
  const [data, setData] = useState<PostProps[]>([]);
  const [data2, setData2] = useState<PostProps[]>([]);
  const [post, setPost] = useState<PostProps | null>(null);
  const { twop, setTwop, fourp, setFourp, sixp, setSixp ,ischeked , setischeked,issuv , setsuv, issudan , setsudan ,ishb , sethb ,value, setValue ,trigr, setTrigr }= useContext(FilterContext);
  const { favCars, setFavCars } = useContext(CartContext);
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [User, setUser] = useState("");
  const { user } = useUser();
  const [addReview ,setReview] = useState(false)
  // const [keys , setkey] = useState("")
  useEffect(() => {
    const storedFavCars = localStorage.getItem("favCars");
    if (storedFavCars) {
      
      setFavCars(JSON.parse(storedFavCars));
    }
  }, [])
 const handletrigr = ()=>{
  setTrigr(!trigr)
 }
 const mp = usePathname();
 const linkHref = mp !== "/catagory" ? "/catagory" : window.location.pathname;
  const query = `*[_type == "cars" && carvalue == "Popular Car"]{
    name,
    slug,
    catagory,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice
  }`;

  const query2 = `*[_type == "cars" && carvalue == "Recomendation Car"]{
    name,
    slug,
    catagory,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice
  }`;

  const query3 = `*[_type == "cars"  && slug.current == "${params.slug}"]{
    _id,
    name,
    slug,
    catagory,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice,
    ratings[]->{rating, reviewText, user ,userImage, userName,
      
      createdAt}
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sanitydata = await sanityClient.fetch(query);
        const sanitydata2 = await sanityClient.fetch(query2);
        const sanitydata3 = await sanityClient.fetch(query3);
         
        setischeked(false)
        setData(sanitydata);
        setData2(sanitydata2);
        setPost(sanitydata3[0]); 
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [params.slug,post]); // Re-fetch when slug changes

  // Render loading state if post is not yet available
 
  const sl = post?.capasity?.charAt(0);
  const isFav = favCars.some((favCar) => JSON.stringify(favCar[0].slug) === JSON.stringify(post?.slug));
console.log(User);


const calculateAverageRating = (ratings: Rating[] = []) => {
  if (!ratings || ratings.length === 0) return 0; // Agar ratings nahi hain, to 0 dikhaye

  // Sum of all rating values
  const totalRating = ratings.reduce((acc, current) => acc + current.rating, 0);

  // Calculate the average rating
  return totalRating / ratings.length;
};
const averageRating = calculateAverageRating(post?.ratings);





const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
 
  // Check if user is logged in
  if (!user) {
    alert("User not logged in.");
    return;
  }

  const reviewData = {
    slug: post?.slug.current,
    rating,
    reviewText,
    
    user: user.id,
    userName : user.fullName,
    userImage : user.imageUrl 
  };
  setReview(true)
  // Step 1: Review data ko API route par bhejna
  const res = await fetch('/api/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  const data = await res.json();

  if (res.status === 200) {
    const newRating = data; // Backend se naya rating data mil raha hai
    const carSlug = post?.slug.current;

    if (newRating && newRating._id && carSlug) {
      try {
        // Step 2: Car document ko slug ke zariye fetch karna
        const updatedCar = await sanityClient2.fetch(
          `*[_type == "cars" && slug.current == $slug][0]`,
          { slug: carSlug }
        );

        if (updatedCar) {
          // Ensure updatedCar.ratings is a valid array
          const ratings = updatedCar.ratings || []; // If it's null or undefined, use an empty array

          // Step 3: User ka existing rating dhoondhna
          const existingRatingIndex = ratings.findIndex(
            (rating : Rating) => rating._ref === newRating._id // Compare by reference ID
          );

          if (existingRatingIndex >= 0) {
            // Agar rating milti hai, toh usko update karo
            ratings[existingRatingIndex] = {
              _ref: newRating._id,
              _type: 'reference',
              _key: `rating-${user.id}-${new Date().getTime()}`, // Unique key using user id and timestamp
            };

            // Step 4: Car document ko update karna
            const finalUpdatedCar = {
              ...updatedCar,
              ratings: ratings, // Updated ratings array
            };

            // Update the car document with the new ratings
            await sanityClient2.patch(updatedCar._id).set({ ratings: finalUpdatedCar.ratings }).commit();
          } else {
            // Agar rating nahi milti, toh nayi rating add karna
            const finalUpdatedCar = {
              ...updatedCar,
              ratings: [
                ...ratings,
                { 
                  _ref: newRating._id, 
                  _type: 'reference',
                  _key: `rating-${user.id}-${new Date().getTime()}`, // Unique key
                },
              ], // Add new rating reference
            };

            // Update the car document with the new ratings
            await sanityClient2.patch(updatedCar._id).set({ ratings: finalUpdatedCar.ratings }).commit();
          }

          alert('Review submitted successfully!');
          setReview(false)
          setRating(0); // Rating reset karna
          setUser(""); // User name reset karna
          setReviewText(""); // Review text reset karna
        } else {
          alert('Error: Car not found.');
        }
      } catch (error) {
        console.error('Error updating car ratings:', error);
        alert('Failed to update car ratings.');
      }
    } else {
      alert('Error: Car slug is undefined.');
    }
  } else {
    alert(`Error: ${data.message}`);
  }
};


























  
  
  

  
      
      
   return(
    <div className="w-full flex xs:px-4 xs:py-4 md:px-6 md:py-6  sm:px-6 sm:py-6 bg-[#E0E9F4] h-full ">
            <div className="w-[22%] xs:hidden sm:hidden bg-white md:hidden lg:hidden xl:hidden h-auto 2xl:w-[255px] 2xl:px-10 px-16 py-10 ">
                
            <div className="flex   flex-col bg-white gap-6">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-xs py-4">TYPE</p>
          <div className="h-auto flex flex-col  gap-6  ">
           <div className="flex items-center xs:text-[10px] sm:text-[10px] text-lg xs:gap-1 sm:gap-1 gap-3">
            <Link href={linkHref}>
           <input id="Sport-checkbox"  className="h-4 w-4 mb-1 rounded-lg" onChange={handletrigr} onClick={()=>{setischeked(!ischeked)}} type="checkbox"></input></Link>
           <label htmlFor="Sport-checkbox" className="cursor-pointer">Sport</label>
           <p className="text-slate-400">(10)</p>
           </div> 
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="SUV-checkbox" className="h-4 w-4 mb-1 rounded-lg" onChange={handletrigr} onClick={()=>{setsuv(!issuv)}} type="checkbox"></input></Link>
           <label htmlFor="SUV-checkbox" className="cursor-pointer">SUV</label>
           <p className="text-slate-400">(12)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="mpv-checkbox" className="h-4 w-4 mb-1 rounded-lg" type="checkbox"></input></Link>
           <label htmlFor="mpv-checkbox" className="cursor-pointer">MPV</label>
           <p className="text-slate-400">(16)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="Sudan-checkbox" className="h-4 w-4 mb-1 rounded-lg" onChange={handletrigr} onClick={()=>{setsudan(!issudan)}} type="checkbox"></input></Link>
           <label htmlFor="Sudan-checkbox" className="cursor-pointer">Sudan</label>
           <p className="text-slate-400">(20)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="Coupe-checkbox" className="h-4 w-4 mb-1 rounded-lg" type="checkbox"></input></Link>
           <label htmlFor="Coupe-checkbox" className="cursor-pointer">Coupe</label>
           <p className="text-slate-400">(14)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="Hatchback-checkbox" className="h-4 w-4 mb-1 rounded-lg" onChange={handletrigr} onClick={()=>{sethb(!ishb)}} type="checkbox"></input></Link>
           <label htmlFor="Hatchback-checkbox" className="cursor-pointer">Hatchback</label>
           <p className="text-slate-400">(14)</p>
           </div>  
          
          </div>
      </div>
      <div className="flex flex-col gap-6 my-12">
          <p style={{letterSpacing: '4px'}} className="text-slate-400 xs:text-[10px] sm:text-[10px] text-xs py-4 ">CAPASITY</p>
          <div className="h-auto flex flex-col gap-6 ">
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="2-checkbox" className="h-4 w-4 mb-1 rounded-lg" onChange={handletrigr} onClick={()=>{setTwop(!twop)}} type="checkbox"></input></Link>
           <label htmlFor="2-checkbox" className="cursor-pointer">2 people</label>
           <p className="text-slate-400">(10)</p>
           </div> 
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="4-checkbox" className="h-4 w-4 mb-1 rounded-xl" onChange={handletrigr} onClick={()=>{setFourp(!fourp)}} type="checkbox"></input></Link>
           <label htmlFor="4-checkbox" className="cursor-pointer">4 people</label>
           <p className="text-slate-400">(14)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="6-checkbox" className="h-4 w-4 mb-1 rounded-lg" onChange={handletrigr} onClick={()=>{setSixp(!sixp)}} type="checkbox"></input></Link>
           <label htmlFor="6-checkbox" className="cursor-pointer">6 people</label>
           <p className="text-slate-400">(12)</p>
           </div>
           <div className="flex items-center xs:text-[10px] sm:text-[10px] xs:gap-1 sm:gap-1 text-lg gap-3">
           <Link href={linkHref}>
           <input id="8-checkbox"  className="h-4 w-4 mb-1 rounded-lg" type="checkbox"></input></Link>
           <label htmlFor="8-checkbox" className="cursor-pointer">8 orMore</label>
           <p className="text-slate-400">(16)</p>
           </div>
          
           
          </div>
      </div>
                <div>
                <div className="flex flex-col gap-6 my-12">
                    <p style={{letterSpacing: '4px'}} className="text-slate-400 text-sm py-4 ">PRICE</p>
                    <div className="h-auto flex flex-col gap-8  ">
                     
                    <Rangeslid min={0}  max={100} value={value} onChange={setValue} bufferd={0}
                    
                    />
                    <p  className='text-2xl '>Max${value}.00</p>
                     </div>
                    
                     </div>
                    
                </div>
            </div>
            <div className="py-6 px-4 xs:px-0 m2xl:w-[78%] w-full 2xl:w-[78%]  sm:px-0 md:px-0 ">
            <div className="w-full grid grid-cols-1 xs:px-0 xs:py-2  sm:px-0 sm:py-2 gap-y-8 gap-x-8 md:px-0 md:py-2 py-8 px-8">
            <div className="col-span-1 row-span-1 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 grid sm:py-1 xs:py-1 md:py-2 py-8 xl:grid-cols-3 md:gap-x-8 md:gap-y-4 gap-y-6 gap-x-10 2xl:grid-cols-3 grid-cols-6 grid-rows-4  ">
                {/* <Image className="col-span-3 row-span-2 h-full w-full" src={Viewcar} alt="car"/> */}
                <div
                   tabIndex={0}
                   style={{
                     backgroundImage: "url(/images/View.jpg)",  
                     backgroundSize: "cover",
                     
                   }}
                   className="rounded-xl  focus-visible:ring-blue-500 focus:ring-2 focus:ring-blue-400 focus:py-2 focus:px-8 focus:outline-2 col-span-3 row-span-3 flex justify-center items-end "
                 >
  

                 
  
                <Image
                src={post?.image ? urlFor(post.image).url() : ''} 
                  alt="carpic"
                   width={500} 
                  height={500}
                  className="mb-6 md:mb-10 sm:w-[300px] xs:w-[200px] md:w-[450px] lg:mb-16 2xl:mb-16 xl:mb-20 lg:w-[650px] xl:w-[700px] 2xl:w-[650px]"
                />

  
                </div>
                
                <div  tabIndex={0} className="xs:hidden xl:hidden sm:hidden md:hidden lg:hidden 2xl:hidden focus-visible:ring-blue-500 focus:ring-2 focus:ring-blue-400 focus:py-8  focus:outline-2 bg-white col-span-3 rounded-xl row-span-4 flex justify-between py-6 px-6 ">
                    <div className="w-full flex flex-col justify-between">
                    <div className="flex justify-between w-full">
                    <div className="">
                        <p className="text-4xl font-bold">{post?.name}</p>
                        <div className=" flex  items-center my-2">
                        <div className="flex gap-4 items-center">
        
        <div className="text-3xl">
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < Math.round(averageRating) ? 'gold' : 'gray' }}>
              ★
            </span>
          ))}
        </div>
        <p>{averageRating.toFixed(1) + " Rating"}</p>
      </div>
                        </div>
                    </div>
                    {isFav ? (<IoHeart  className="text-4xl text-red-500" />) :
                           (<IoHeartOutline  className="text-4xl text-slate-300" />)}
                    </div>
    
                    <div>
                        <div className="text-[26px] font-extralight  text-slate-400 flex flex-col gap-4">
                          <p >NISMO has become the embodiment of Nissans </p>
                          <p> outstanding performance, inspired by the most</p>
                          <p> unforgiving proving ground, the {"race track"}.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-2 gap-x-[5%] text-[28px] text-slate-300 text-end">
                        <p className="text-start">Type Car</p>
                        <p className="text-slate-400 ">{post?.catagory}</p>
                        <p>Capacity</p>
                        <p className="text-slate-400 text-end">{sl}Person</p>
                        <p className="text-start">Steering</p>
                        <p className="text-slate-400 ">Manual</p>
                        <p>Gasoline</p>
                        <p className="text-slate-400 text-end">{post?.fuel +"L"}</p>
                    </div>
                      <div>
                        <div className="w-full flex justify-between ">
                            <div className="flex items-end py-2">
                                <p className="text-5xl">{"$" + post?.price +".00/"}</p>
                                <p className="text-slate-400">days</p>
                            </div>
                            <div>
                            <a href={`/billing/${post?.slug.current}`}>
                                <button className="bg-blue-600 rounded-md text-white  py-7 px-16 text-xl">RentNow</button></a>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 line-through text-xl">{post?.secondprice ? "$" + post.secondprice +".00" : ""}</p>
                        </div>
                      </div>
                    </div>
                </div>
                <div tabIndex={0} className=" focus:border-blue-500 focus:ring-2  rounded-lg focus:ring-blue-400 focus:py-2 focus:px-2">
                <div
                
                style={{
                  backgroundImage: "url(/images/ViewA.jpg)",  
                  backgroundSize: "cover",
                  
                }}
                
                className="flex justify-start items-center col-span-1 row-span-1 rounded-lg  h-full w-full  "
                >
                <Image  width={180} height={150} src={post?.image ? urlFor(post.image).url() : ''} className="pl-[7%] lg:pl-[10%] lg:w-[220px] md:pl-[8%] md:w-[220px] xl-pl-[17%] xl:w-[300px] 2xl:pl-[13%] 2xl:w-[260px]" alt="car"/></div></div>
                <Image tabIndex={0} className="col-span-1 row-span-1 h-full w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:py-2  focus:px-2" src={ViewB} alt="car"/>
                <Image tabIndex={0} className="col-span-1 row-span-1 h-full w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:py-2  focus:px-2" src={ViewC} alt="car"/>
            </div>
            <div className="hidden xs:block sm:block lg:block md:block xl:block 2xl:block col-span-1">
            <div  tabIndex={0} className="  focus-visible:ring-blue-500 focus:ring-2 focus:ring-blue-400 focus:py-8  focus:outline-2 bg-white col-span-3 rounded-xl row-span-4 flex justify-between xs:px-3 xs:py-4 sm:px-3  py-6 px-6 ">
                    <div className="w-full flex flex-col justify-between">
                    <div className="flex justify-between w-full">
                    <div className="">
                        <p className="text-4xl md:text-3xl sm:text-2xl xs:text-xl font-bold">{post?.name}</p>
                        <div className=" flex  items-center xs:my-1 my-6">
                        <div className="flex gap-4 items-center">
        
                           <div className="text-3xl">
                             {[...Array(5)].map((_, i) => (
                               <span key={i} style={{ color: i < Math.round(averageRating) ? 'gold' : 'gray' }}>
                                 ★
                               </span>
                             ))}
                           </div>
                           <p>{averageRating.toFixed(1) + " Rating"}</p>
                         </div>
                        </div>
                    </div>
                    {isFav ? (<IoHeart  className="text-4xl text-red-500" />) :
                           (<IoHeartOutline  className="text-4xl text-slate-300" />)}
                    </div>
                    <div>
                        <p className="text-[28px] font-extralight hidden xl:block text-slate-400">NISMO has become the embodiment of Nissans outstanding performance, inspired by the most unforgiving proving ground, the {"race track"}.</p>
                        <div className="text-[22px] md:text-[22px] xs:text-[12px] xs:my-4 sm:text-[16px] xl:hidden font-extralight  text-slate-400 flex flex-col gap-4">
                          <p >NISMO has become  embodiment of Nissans </p>
                          <p> outstanding performance, inspired by the most</p>
                          <p> unforgiving proving ground, the {"race track"}.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-2 gap-x-[5%] mt-6 md:text-[22px] sm:text-[16px] xs:text-[12px] text-[28px] text-slate-300 text-end">
                        <p className="text-start">Type Car</p>
                        <p className="text-slate-400 ">{post?.catagory}</p>
                        <p>Capacity</p>
                        <p className="text-slate-400 text-end">{sl} Person</p>
                        <p className="text-start">Steering</p>
                        <p className="text-slate-400 ">Manual</p>
                        <p>Gasoline</p>
                        <p className="text-slate-400 text-end">{post?.fuel +"L"}</p>
                    </div>
                      <div>
                        <div className="w-full flex items-center mt-6 justify-between ">
                            <div className="flex items-end xs:pb-0 py-2">
                                <p className="text-5xl md:text-4xl xs:text-xl sm:text-3xl">{"$"+post?.price+".00/"}</p>
                                <p className="text-slate-400 xs:text-sm">days</p>
                            </div>
                            <div>
                                 <a href={`/billing/${post?.slug.current}`}>
                                <button  className="bg-blue-600 rounded-md text-white xs:px-4 xs:py-2 sm:px-6 sm:py-3  py-5 px-12 sm:text-lg text-xl">RentNow</button></a>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 md:text-lg md:mb-4 xs:text-xs line-through sm:text-sm text-xl">{"$" + post?.secondprice +".00"}</p>
                        </div >
                      </div>
                    </div>
                </div></div>
            <div className="col-span-1 row-span-1   bg-white rounded-lg xs:px-3 xs:py-6 px-6 py-8">
                <div className="h-full  w-full">
                <div className="flex gap-2  w-full">
                    <p className="text-3xl md:text-2xl sm:text-xl xs:text-lg font-serif">Reviews</p>
                    <div className="py-1 px-4 text-2xl md:text-xl sm:text-lg xs:text-[16px] font-serif text-white bg-blue-600 rounded-md">13</div>

                </div>
                <form onSubmit={handleSubmit} className="mt-4">
  <div className="mb-4">
    <label className="block text-lg font-semibold">Rating:</label>
    <div className="stars flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
          onClick={() => setRating(star)} // Allow user to click and select rating
        >
          ★
        </span>
      ))}
    </div>
  </div>

  
 

  <div className="mb-4">
    <label className="block text-lg font-semibold">Review:</label>
    <textarea
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review"
      className="w-full p-2 border rounded-md border-gray-300"
    />
  </div>

  <button disabled={addReview} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
  
    {addReview ? "Adding Review ..." : "Submit Review"}
  </button>
</form>         {post?.ratings?.map((review) => {
               const formattedDate = review?.createdAt ? new Date(review.createdAt).toLocaleDateString("en-GB") : "No date available";
   return(
                <div key={review.rating} className="">
                <div className="flex justify-between  gap-4 h-auto w-full my-8">
                  {review?.userImage ? (<img className="h-28 w-28 sm:h-14 xs:h-12 xs:w-12 md:mt-4 sm:w-12 md:h-16 md:w-16" width={112} height={0} src={review?.userImage } alt=""/>)
                  : (<FaUserCircle className="text-7xl mt-4" />)}
                
                <div className="w-full  h-full">
                <div className="flex justify-between  items-center w-full ">
                    <div className="flex h-20 md:h-16 sm:items-center xs:h-[40px] sm:h-[40px] flex-col xs:mt-0 sm:mt-0 my-4 xs:justify-center xs:items-center md:items-center justify-between">
                        <p className="text-2xl md:text-xl sm:leading-[17px] xs:leading-[17px] xs:text-[12px] sm:text-[14px]">{review?.userName}</p>
                        <p className="text-2xl md:text-lg sm:leading-[17px] xs:leading-[17px] sm:mt-0 xs:text-[12px] sm:text-[14px] text-slate-400">Skylar Dias</p>
                    </div>
                    <div className="flex flex-col h-20 sm:h-[40px] xs:h-[26px] md:h-[60px] xs:justify-center xs:mb-3  items-end justify-between">
                        <p className="text-2xl md:text-lg sm:leading-[17px] xs:leading-[17px] xs:text-[12px] sm:text-[14px] text-slate-400">{formattedDate}</p>
                        <div className="stars flex">
                           {[1, 2, 3, 4, 5].map((star) => (
                             <span
                               key={star}
                               className={`text-2xl cursor-pointer ${star <= review?.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                             >
                               ★
                             </span>
                           ))}
                         </div>
                    </div>
                    
                </div>
                <div className="text-slate-400 my-8 xs:text-xs sm:text-sm text-lg border-[1px] border-slate-400 px-4 py-6 w-full">
                <p>{review?.reviewText}</p>
                </div>
                </div>

                </div>
                
                </div>
)})}
                <div className="flex justify-center  w-full text-slate-400 text-2xl xs:text-[14px] sm:text-xl xs:py-3 sm:py-4 py-12 items-center">
                    <div className="flex gap-3">
                        <p>Show All</p>
                        <RiArrowDownWideFill />

                    </div>
                </div>
                </div>
               
            </div>
            </div>
            <div>
            <div className="py-8 xs:px-0 xs:py-0 sm:px-0 sm:py-0 md:px-0 md:py-0 px-8 ">
              <div className="w-full flex justify-between my-8 px-4 py-2 text-lg">
               <p className="text-slate-300">Recent Car</p>
               <a className="text-blue-500">View All</a>
              </div>
                <div className="flex xs:gap-4 overflow-x-auto  px-2 sm:gap-4 2 2xl:gap-10 md:gap-4 lg:gap-6  gap-16 xl:gap-8 custom-scroll  justify-between ">
                {data?.map((c : PostProps )=>{
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
                
                  <Car isFav={isFav} onFavToggle={handleFavToggle} link2={`/detail/${c.slug.current}`} key={c.slug.current} link={`/billing/${c.slug.current}`} className="2xl:w-[360px] m2xl:w-[360px] "  carname={c.name} carcatagory={c.catagory} carpic={c.image} carfuel={c.fuel} cardrive={c.handle}
                   carcapasity={c.capasity} carprice={c.price} carptwo={c.secondprice} />

               

              )
            })}
                </div>
            </div>
            <div className="py-8 xs:px-0 xs:py-0 sm:px-0 sm:py-0 md:px-0 md:py-0 px-8 ">
              <div className="w-full flex justify-between my-8 px-4 py-2 text-lg">
               <p className="text-slate-300">Recomendation Car</p>
               <a className="text-blue-500">View All</a>
              </div>
                <div className="flex  md:gap-4 sm:gap-4 xs:gap-4 2xl:gap-10 px-2 lg:gap-6  gap-16 xl:gap-8 custom-scroll overflow-x-auto justify-between ">
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
                
                  <Car isFav={isFav} onFavToggle={handleFavToggle} link2={`/detail/${c.slug.current}`} key={c.slug.current} link={`/billing/${c.slug.current}`} className="2xl:w-[360px] m2xl:w-[360px]"   carname={c.name} carcatagory={c.catagory} carpic={c.image} carfuel={c.fuel} cardrive={c.handle}
                   carcapasity={c.capasity} carprice={c.price} carptwo={c.secondprice} />

               

              )
            })}
                </div>
            </div>
            </div>
            </div>

            
            

        </div>
   )   

}

export default Detail