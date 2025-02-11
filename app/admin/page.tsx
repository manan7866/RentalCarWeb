// "use client"

// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";
// interface PostProps {
//     [key : string]: {
//       name: string;
//       slug: string;
//       catagory: string;
//       image: string;
//       fuel: string;
//       handle: string;
//       capasity: string;
//       price: string;
//       secondprice: string;
//     };
//   }



// const Admin = ({params}:{params : {slug : string}})=>{
//     console.log(params);

//     const [data, setData] = useState([]);
//     const [data2, setData2] = useState([]);
//     const [post, setPost] = useState<any>();
//     const [data3, setdata3] = useState();

//     const query = `*[_type == "car"]{
//       name,
//       slug,
//       catagory,
//       image,
//       fuel,
//       handle,
//       capasity,
//       price,
//       secondprice
//     }`;

//     const query2 = `*[_type == "cartwo"]{
//       name,
//       slug,
//       catagory,
//       image,
//       fuel,
//       handle,
//       capasity,
//       price,
//       secondprice
//     }`;

//     const query3 = `*[_type == "car"  && slug.current == "${params.slug}" || _type == "cartwo"  && slug.current == "${params.slug}" || _type == "carct"  && slug.current == "${params.slug}" ]{
//       name,
//       slug,
//       catagory,
//       image,
//       fuel,
//       handle,
//       capasity,
//       price,
//       secondprice
//     }`;

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const sanitydata = await client.fetch(query);
//           const sanitydata2 = await client.fetch(query2);
//           const sanitydata3 = await client.fetch(query3);
//           console.log(sanitydata3[0]); // یہ آپ کے ڈیٹا کی تصدیق کے لیے ہے

//           setData(sanitydata);
//           setData2(sanitydata2);
//           setPost(sanitydata3[0]);
//           setdata3(sanitydata.pop())
//           console.log(data3);
//           const data4 = sanitydata2.find((i : PostProps) => {i.name == "CR - V"})

//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchData();
//     }, [params.slug]); // Re-fetch when slug changes

// }

// export default Admin
"use client";
import Image from "next/image"


import { Chart } from "@/app/charts/Charts"
import { urlFor } from "@/sanity/lib/image";
import React from "react"

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Addproduct from "@/app/addproducts/page"
import { RiHome5Fill } from "react-icons/ri";

import { AiTwotoneCar } from "react-icons/ai";

import { IoStatsChartOutline } from "react-icons/io5";

import { LiaWalletSolid } from "react-icons/lia";

import { BiMessageMinus } from "react-icons/bi";

import { PiCalendarDotsLight } from "react-icons/pi";

import setting from "@/public/Dashboard/setting.png"
import help from "@/public/Dashboard/help.png"
import briefcase from "@/public/Dashboard/briefcase.png"

import logout from "@/public/Dashboard/logout.png"

import sun from "@/public/Dashboard/sun.png"
import moon from "@/public/Dashboard/moon.png"


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
}

const Admin = ({ params }: { params: { slug: string } }) => {
    console.log(params);

    const [data, setData] = useState<PostProps[]>([]);

    const [post, setPost] = useState<PostProps | null>(null);

    const [dashboard , setDashbord] = useState(true);
    const [inventory , setInventory]= useState(false)


    const query = `*[_type == "carupdates" "]{
    name,
    slug,
    catagory,
    image,
    fuel,
    handle,
    capasity,
    price,
    secondprice,
    createdAt
  }`;

    const query2 = `*[_type == "cars"]{
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

    const query3 = `*[_type == "cars" && slug.current == "${params.slug}"]{
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sanitydata = await client.fetch(query);
                const sanitydata2 = await client.fetch(query2);
                const sanitydata3 = await client.fetch(query3);


                console.log(sanitydata3[0]);

                setData(sanitydata);
                // setData2(sanitydata2);
                if (sanitydata3.length > 0) {
                    setPost(sanitydata3[0]);
                }


                sanitydata.pop();


                const crVItem = sanitydata2.find((item: PostProps) => item.name === "CR-V");

                if (crVItem) {

                    const updatedData = [...sanitydata, crVItem];
                    setData(updatedData);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params.slug]);

    return (
        <>

            <main className="w-full h-auto bg-[#F6F7F9]">
                <div className="flex xl:w-full">
                    <div className="hidden 2xl:block m2xl:block m2xl:w-1/4 m2xl:h-auto bg-white p-10">
                        <div className="w-auto h-auto bg-white">


                            {/* Main Menu Section */}
                            <div className="justify-start">
                                <h6 className="text-[#90A3BF] text-[12px] font-semibold ml-6">MAIN MENU</h6>
                                <div className="space-y-3 pt-5">

                                    <div  tabIndex={0} autoFocus onFocus={()=>{setDashbord(true) , setInventory(false)} 
                                    }
                                        className="flex items-center gap-3 px-4 py-4 focus:outline-none rounded-lg group hover:bg-blue-200 cursor-pointer  hover:text-white focus:text-white text-[#90A3BF] focus:bg-blue-400 bg-white">
                                        <RiHome5Fill className="text-[32px]  " />
                                        <label
                                            className=" text-[16px] font-medium">
                                            Dashboard
                                        </label>
                                    </div>
                                    <div tabIndex={0} onFocus={()=>{setDashbord(false)
                                    setInventory(true)}}
                                        className="flex items-center gap-3 px-4 py-4 rounded-lg group focus:outline-none  hover:bg-blue-200 cursor-pointer  hover:text-white focus:text-white text-[#90A3BF] focus:bg-blue-400 bg-white">
                                        <AiTwotoneCar className="text-[32px]" />
                                        <label
                                            className=" text-[16px] font-medium">
                                            Inventory
                                        </label>
                                    </div>
                                    <div tabIndex={0}
                                        className="flex items-center gap-3 px-4 py-4 rounded-lg group  focus:outline-none  hover:bg-blue-200 cursor-pointer  hover:text-white focus:text-white text-[#90A3BF] focus:bg-blue-400 bg-white">
                                        <IoStatsChartOutline className="text-[32px]" />
                                        <label
                                            className=" text-[16px] font-medium">
                                            Insight
                                        </label>
                                    </div>
                                    <div tabIndex={0}
                                        className="flex items-center gap-3 px-4 py-4 rounded-lg group focus:outline-none  hover:bg-blue-200 cursor-pointer   hover:text-white focus:text-white text-[#90A3BF] focus:bg-blue-400 bg-white">
                                        <LiaWalletSolid className="text-[32px]" />
                                        <label
                                            className=" text-[16px] font-medium">
                                            Reimburse
                                        </label>
                                    </div>
                                    <div tabIndex={0}
                                        className="flex items-center gap-3 px-4 py-4 rounded-lg focus:outline-none  hover:bg-blue-200 cursor-pointer   hover:text-white focus:text-white text-[#90A3BF] focus:bg-blue-400 bg-white">
                                        <BiMessageMinus className="text-[32px]" />
                                        <label
                                            className=" text-[16px] font-medium">
                                            Inbox
                                        </label>
                                    </div>
                                    <div tabIndex={0}
                                        className="flex items-center gap-3 px-4 py-4 rounded-lg focus:outline-none  hover:bg-blue-200 cursor-pointer   hover:text-white focus:text-white text-[#90A3BF] focus:bg-blue-400 bg-white">
                                        <PiCalendarDotsLight className="text-[32px]" />

                                        <label
                                            className=" text-[16px] font-medium">
                                            Calender
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Prefrences  */}
                            <div className="justify-start pt-20">
                                <h6 className="text-[#90A3BF] text-[12px] font-semibold ml-6">PREFERENCES</h6>
                                <div className="space-y-3 pt-5">
                                    <div className="flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                        <Image src={setting} id="logout" className="w-8 h-8 fill-white" alt="Icon" />
                                        <label
                                            htmlFor="setting"
                                            className="text-[#90A3BF] text-[16px] font-medium group-hover:text-white">
                                            Setting
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                        <Image src={help} id="logout" className="w-8 h-8 fill-white" alt="Icon" />
                                        <label
                                            htmlFor="help"
                                            className="text-[#90A3BF] text-[16px] font-medium group-hover:text-white">
                                            Help
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-4 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                        <Image src={briefcase} id="logout" className="w-8 h-8 fill-white" alt="Icon" />
                                        <label
                                            htmlFor="darkmode"
                                            className="text-[#90A3BF] text-[16px] font-medium group-hover:text-white">
                                            Dark Mode
                                        </label>
                                        <div className="flex justify-between p-1 items-center w-24 h-10 ml-auto bg-[#F6F7F9] rounded-full">
                                            <div className="w-8 h-8 p-1 items-center bg-[#3563E9] rounded-full">
                                                <Image src={sun} className="w-full h-full" alt="sun" />
                                            </div>
                                            <div className="w-8 h-8 p-1 items-center rounded-full">
                                                <Image src={moon} className="w-full h-full" alt="moon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 px-4 py-4 mt-60 rounded-lg group cursor-pointer bg-white hover:bg-blue-200">
                                <Image src={logout} id="logout" className="w-8 h-8 fill-white" alt="Icon" />
                                <label
                                    htmlFor="logout"
                                    className="text-[#90A3BF] text-[16px] font-medium group-hover:text-white">
                                    Log Out
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="px-10 md:px-6 md:py-6 sm:px-6 w-full xs:px-4 xs:py-4 sm:py-6 2xl:w-full xl:w-full md:w-full lg:w-full py-5">
                        {dashboard && (<div className="m2xl:flex m2xl:justify-between w-full 2xl:justify-between gap-5 2xl:w-full grid grid-cols-1 ">

<div className="relative  2xl:w-full xl:w-full h-auto w-full bg-white rounded-lg space-y-5 p-5">
    <h1 className=" bg-white text-[20px] font-bold">Details Rental</h1>
    <div className="w-full h-auto">
        <svg className="w-full h-full" viewBox="0 0 486 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_35_8520)">
                <rect width="486" height="272" rx="10" fill="#F6F7F9" />
                <path d="M230.5 273C295 142.5 391.909 251.5 506.007 97.4999" stroke="#A6CEF2" strokeWidth="16" strokeLinecap="round" />
                <path d="M144.04 150.107L174.391 143.5L192.377 153L204.742 198L217.108 209L226.663 240.311L169.332 256.5L144.04 150.107Z" fill="#A6CEF2" />
                <path d="M57 64.6899L123.861 62L140 125.481L57 147V64.6899Z" fill="#A6CEF2" />
                <line x1="8" y1="-8" x2="313.27" y2="-8" transform="matrix(0.19443 0.980916 -0.98792 0.154963 214.86 -41)" stroke="white" strokeWidth="16" strokeLinecap="round" />
                <line x1="5" y1="-5" x2="316.27" y2="-5" transform="matrix(0.19443 0.980916 -0.98792 0.154963 105.82 -23)" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M502.5 177L97.4756 278.998" stroke="white" strokeWidth="16" strokeLinecap="round" />
                <line x1="8" y1="-8" x2="322.378" y2="-8" transform="matrix(0.544406 0.838822 -0.889535 0.456866 309.286 -41)" stroke="white" strokeWidth="16" strokeLinecap="round" />
                <path d="M-16.5 171.5C149.023 114.177 302.973 83.4419 488.623 87.9815" stroke="white" strokeWidth="16" strokeLinecap="round" />
                <path d="M423.225 113L392.81 128L368.079 158.5L423.224 417.371" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M154.156 209.403L137.299 218.683L123.904 238.053L159.347 406.031" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M149.661 148.5L174.953 142.5L194.626 153L204.743 199.5L218.794 209L227.787 242" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <path d="M388.038 128.439L360.995 90.9845" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M265.445 145L300.293 131.5L308.724 96.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M244.087 40.0466L287.928 37.5L325.586 57L338.513 85" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M100.199 180.833L90.082 140.317" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M133.923 221.833L123.806 181.317" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M209.962 199.943L268.699 188" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M122.99 16.9717L155.23 11.0006" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M52.025 144.962L51.8159 69.0155" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M195.577 151.335L225.539 140.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M198.542 108.037L192.615 83.8928L170.951 73.248L147.975 -32.0002" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M228.566 137.663L249.145 116.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M230.598 143.202L257.752 150.403" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M314.345 44.5L352.178 21.4032" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M289.052 35L289.052 -20.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M-46 73L185.633 53" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M144.83 167.001L72.0002 196L44.9998 274.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
                <path d="M328 92.9999L257.552 100.707C254.037 101.092 251.615 104.417 252.328 107.88L270.187 194.715L288.874 289.006" stroke="#3563E9" strokeWidth="8" strokeLinecap="round" />
                <path d="M337.62 72.45C336.57 67.83 332.54 65.75 329 65.75C329 65.75 329 65.75 328.99 65.75C325.46 65.75 321.42 67.82 320.37 72.44C319.2 77.6 322.36 81.97 325.22 84.72C326.28 85.74 327.64 86.25 329 86.25C330.36 86.25 331.72 85.74 332.77 84.72C335.63 81.97 338.79 77.61 337.62 72.45ZM329 77.46C327.26 77.46 325.85 76.05 325.85 74.31C325.85 72.57 327.26 71.16 329 71.16C330.74 71.16 332.15 72.57 332.15 74.31C332.15 76.05 330.74 77.46 329 77.46Z" fill="#3563E9" />
            </g>
            <defs>
                <clipPath id="clip0_35_8520">
                    <rect width="486" height="272" rx="10" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
    <div className="flex  items-center">
        <div className="w-[195px] 2xl:w-[175px] sm:w-[150px] xs:w-[120px] xs:h-[97px] sm:h-[125px] 2xl:h-[145px]  h-[158px]">
            <div style={{
                backgroundImage: "url(/images/ViewA.jpg)",
                backgroundSize: "cover",



            }} className="2xl:pr-6 w-full h-full flex justify-center items-center">
                <Image tabIndex={0} width={180} height={150} src={post?.image ? urlFor(post.image).url() : ''} className="pl-[7%] lg:pl-[10%]  lg:w-[220px] md:pl-[8%] md:w-[220px] xl-pl-[17%] xl:w-[300px] 2xl:pl-[13%] 2xl:w-[260px]" alt="car" />
            </div>
        </div>
        <div className="flex justify-between sm:w-[57%] xs:w-[57%] sm:gap-0  xs:gap-0 items-start px-2 py-5 gap-[160px]">
            <div className="sm:w-full xs:w-full">
                <h1 className="font-bold bg-white xs:text-[16px] text-[24px] ">{post?.name}</h1>
                <div className="flex justify-between sm:gap-2 xs:gap-1 sm:w-full  gap-[185px]">
                    <h6 className="text-[14px] xs:text-[10px] text-[#3D5278] font-medium">{post?.catagory}</h6>
                    <h6 className="m2xl:hidden text-[14px] text-[#3D5278] font-medium">#9761</h6>
                </div>
            </div>
            <h6 className="hidden m2xl:block text-[14px] text-[#3D5278] font-medium">#9761</h6>
        </div>
    </div>

    {/* Pickup Location  */}

    <div className="w-full h-auto m2xl:h-44 py-5 bg-white rounded-m2xl space-y-5">
        <div className="flex w-full gap-3">
            <input type="radio" />
            <h2 className=" text-[16px] font-semibold">Pick - Up</h2>
        </div>
        <div className="m2xl:flex m2xl:justify-between m2xl:items-center ">
            <div className="m2xl:w-[40%] w-full">
                <h2 className="text-[16px] font-bold ">Location</h2>
                <div className="bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl sm:w-full sm:h-16 text-[#90A3BF] text-[12px] font-medium p-5">
                    <select className="bg-transparent outline-none" name="city" id="city">
                        {[
                            { value: "none", label: "Select your city" },
                            { value: "khi", label: "Karachi" },
                            { value: "hyd", label: "Hyderabad" },
                            { value: "lhr", label: "Lahore" },
                            { value: "qta", label: "Quetta" },
                            { value: "isb", label: "Islamabad" },
                            { value: "nbs", label: "Nawabshah" },
                        ].map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-20 hidden m2xl:block">
                <div className="w-[1px] h-14 bg-[#C3D4E9] opacity-40">
                </div>
            </div>
            <div className="m2xl:w-[40%] w-full" >
                <h2 className="text-[16px] font-bold">Date</h2>
                <div className="bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl sm:w-full sm:h-16 text-[#90A3BF] text-[12px] font-medium p-5">
                    <input className="bg-[#F6F7F9] rounded-m2xl m2xl:bg-transparent outline-none" type="date" id="f-day" name="from-date" min="2024-12-11" max="2025-12-10" />
                </div>
            </div>
            <div className="w-20 hidden 2xl:block m2xl:block">
                <div className="w-[1px] h-14 bg-[#C3D4E9] opacity-40">
                </div>
            </div>
            <div className="m2xl:w-[40%] w-full" >
                <h2 className="text-[16px] font-bold">Time</h2>
                <div className="bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl sm:w-full sm:h-16 text-[#90A3BF] text-[12px] font-medium p-5">
                    <input className=" bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl outline-none" type="time" id="time" />
                </div>
            </div>
        </div>
    </div>

    {/* Drop off Location */}

    <div className="w-full h-auto m2xl:h-44 py-5 bg-white rounded-m2xl space-y-5">
        <div className="flex w-full gap-3">
            <input type="radio" />
            <h2 className=" text-[16px] font-semibold">Drop - Off</h2>
        </div>
        <div className="m2xl:flex m2xl:justify-between m2xl:items-center ">
            <div className="m2xl:w-[40%] w-full">
                <h2 className="text-[16px] font-bold ">Location</h2>
                <div className="bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl sm:w-full sm:h-16 text-[#90A3BF] text-[12px] font-medium p-5">
                    <select className="bg-transparent outline-none" name="city" id="city">
                        {[
                            { value: "none", label: "Select your city" },
                            { value: "khi", label: "Karachi" },
                            { value: "hyd", label: "Hyderabad" },
                            { value: "lhr", label: "Lahore" },
                            { value: "qta", label: "Quetta" },
                            { value: "isb", label: "Islamabad" },
                            { value: "nbs", label: "Nawabshah" },
                        ].map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-20 hidden m2xl:block">
                <div className="w-[1px] h-14 bg-[#C3D4E9] opacity-40">
                </div>
            </div>
            <div className="m2xl:w-[40%] w-full" >
                <h2 className="text-[16px] font-bold">Date</h2>
                <div className="bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl sm:w-full sm:h-16 text-[#90A3BF] text-[12px] font-medium p-5">
                    <input className="bg-[#F6F7F9] rounded-m2xl m2xl:bg-transparent outline-none" type="date" id="f-day" name="from-date" min="2024-12-11" max="2025-12-10" />
                </div>
            </div>
            <div className="w-20 hidden m2xl:block">
                <div className="w-[1px] h-14 bg-[#C3D4E9] opacity-40">
                </div>
            </div>
            <div className="m2xl:w-[40%] w-full" >
                <h2 className="text-[16px] font-bold">Time</h2>
                <div className="bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl sm:w-full sm:h-16 text-[#90A3BF] text-[12px] font-medium p-5">
                    <input className=" bg-[#F6F7F9] m2xl:bg-transparent rounded-m2xl outline-none" type="time" id="time" />
                </div>
            </div>
        </div>
    </div>

    <hr />

    <div className="flex justify-between lg:items-center items-start sm:px-0 px-2 py-5">
        <div className="w-36 2xl:w-60 m2xl:w-64">
            <h1 className="font-bold text-[20px] xs:text-[16px] sm:text-sm bg-white xs:w-56 sm:w-60 ">Total Rental Price</h1>
            <h6 className="text-[9px] xs:text-[8px]  text-[#90A3BF] sm:text-[10px] font-medium">Overall price and includes rental discount</h6>
        </div>
        <h1 className="text-[32px] bg-white xs:text-[24px] sm:text-[28px]  font-bold">{"$" + post?.price}</h1>
    </div>

</div>


<div className="space-y-5 2xl:w-full">
    <div className="w-auto 2xl:w-full h-auto bg-white rounded-lg p-5">
        <div className="flex justify-between items-center text-[#90A3BF] text-[14px] font-medium">
            <h1 className=" bg-white text-black text-[20px] font-bold">Top 5 Car Rental</h1>
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-black" />
                <div className="w-2 h-2 rounded-full bg-black" />
                <div className="w-2 h-2 rounded-full bg-black" />
            </div>
        </div>

        {/* <div className="flex justify-between items-center py-10 gap-4"> */}
        <div className="flex justify-between xs:flex-col xs:justify-center sm:flex-col sm:justify-center md:w-full items-center m2xl:w-full  md:flex-col m2xl:px-6 w-full px-6  ">
            <div className="m2xl:w-[400px]    w-full xs:w-full sm:w-full  lg:px-[2%] md:px-0 sm:px-0 h-full m2xl:px-0 ">
                <Chart />
            </div>

            <div className="flex flex-col justify-between md:w-[55%] sm:w-[80%] lg:w-[40%]  py-4 m2xl:w-[45%] sm:gap-6 md:gap-0 md:my-6 sm:py-6 w-full xs:h-[220px]  h-[270px] ">
                <div className="flex justify-between ">
                    <div className="flex items-center gap-4 text-right">
                        <div className="w-3 h-3 rounded-full bg-[#0D3559]" />
                        <h2 className="text-[#85A8F8] 2xl:text-lg xl:text-lg text-[14px] font-medium">Sport Car</h2>
                    </div>
                    <h3 className=" text-[14px] 2xl:text-lg xl:text-lg font-semibold">17,439</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-right">
                        <div className="w-3 h-3 rounded-full bg-[#175D9C]" />
                        <h2 className="text-[#85A8F8] 2xl:text-lg xl:text-lg text-[14px] font-medium">SUV</h2>
                    </div>
                    <h3 className=" text-[14px] 2xl:text-lg xl:text-lg font-semibold">9,478</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-right">
                        <div className="w-3 h-3 rounded-full bg-[#2185DE]" />
                        <h2 className="text-[#85A8F8] 2xl:text-lg xl:text-lg text-[14px] font-medium">Coupe</h2>
                    </div>
                    <h3 className=" text-[14px] 2xl:text-lg xl:text-lg font-semibold">18,197</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-right">
                        <div className="w-3 h-3 rounded-full bg-[#63A9E8]" />
                        <h2 className="text-[#85A8F8] 2xl:text-lg xl:text-lg text-[14px] font-medium">Hatchback</h2>
                    </div>
                    <h3 className=" text-[14px] 2xl:text-lg xl:text-lg font-semibold">12,510</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-right">
                        <div className="w-3 h-3 rounded-full bg-[#A6CEF2]" />
                        <h2 className="text-[#85A8F8] 2xl:text-lg xl:text-lg text-[14px] font-medium">MPV</h2>
                    </div>
                    <h3 className=" text-[14px] 2xl:text-lg xl:text-lg font-semibold">14,406</h3>
                </div>

            </div>
        </div>
    </div>


    {/* cars  */}
    <div className="w-auto h-auto  bg-white rounded-lg py-8 p-5">
        <div className="flex justify-between items-center text-[#90A3BF] text-[14px] font-medium">
            <h1 className=" bg-white text-black xs:text-[13px] text-[20px] font-bold">Recent Transaction</h1>
            <button className="text-[#3563E9] xs:text-[10px] text-[16px] font-semibold">View All</button>
        </div>
        <div>
            {data?.map((c, index) => {
                let date = 20 - index


                return (
                    <Link href={`/billing/${c.slug.current}`} legacyBehavior key={c.name} className=" w-full">
                        <a className="my-link-class" target="_blank" rel="noopener noreferrer">
                            <div className="flex gap-4 py-10 w-full">
                                <Image className=" xs:w-28" width={144} height={0} src={urlFor(c.image).url()} alt="" />
                                <div className="w-full">
                                    <div className="flex w-full text-xl md:text-lg sm:text-[10px] font-bold items-center justify-between">
                                        <p className="sm:text-[9px] xs:text-[9px]">{c.name}</p>
                                        <p className="text-slate-400 xs:text-[8px] text-lg sm:text-[9px] md:text-sm font-normal">{date -= 1} July</p>
                                    </div>
                                    <div className="flex w-full text-xl md:text-lg sm:text-[10px]font-bold justify-between">
                                        <p className="text-slate-400 xs:text-[9px] text-lg sm:text-[9px] md:text-sm font-normal">{c.catagory === "sport" ? c.catagory + " car" : c.catagory}</p>
                                        <p className="sm:text-[9px] xs:text-[8px]">{"$" + c.price + ".00"}</p>
                                    </div>
                                </div>

                            </div>
                            <div> <hr /></div></a>
                    </Link>
                )
            })}
        </div>

    </div>
</div>
</div>)}
{inventory && (<Addproduct/>)}
                        
                    </div>
                </div>
            </main>
        </>
    );
};

export default Admin;
