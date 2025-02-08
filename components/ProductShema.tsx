// "use client"

// import React, { useState } from 'react'
// import {z} from "zod";
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from './ui/input';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { client } from '@/sanity/lib/client';
// import Image from 'next/image';
// import { urlFor } from '@/sanity/lib/image';


// interface productDataType {
//     name : string,
//     slug : string ,
//     catagory : string,
//     image : string,
//     fuel : string,
//     handle : string,
//     capasity :string,
//     price : number,
//     secondprice? : string
// }

// const addproduct = async (productData : productDataType) =>{
//     try{
//         const result = await client.create({
//             _type: 'cartwo', // Schema type
//             name: productData.name,
//             slug: productData.slug,
//             catagory: productData.catagory,
//             image: productData.image,
//             fuel: productData.fuel,
//             handle: productData.handle,
//             capasity: productData.capasity,
//             price: productData.price,
//             secondprice: productData.secondprice,
//           });
      
//           console.log('Product added successfully:', result);

//     }catch (error) {
//         console.error('Error adding product:', error.message);
//       }
// }
// const formSchema = z.object({
//     name : z.string().min(5, "Product name must be at least 5 characters long")
//     .max(20, "Product name must be at most 20 characters long"),
//     slug : z.string().min(4, "Product name must be at least 4 characters long")
//     .max(15, "Product name must be at most 15 characters long"),
//     catagory : z.string().min(2, "Product name must be at least 2 characters long")
//     .max(10, "Product name must be at most 10 characters long"),
//     fuel : z.string().min(1, "Product name must be at least 1 characters long")
//     .max(3, "Product name must be at most 3 characters long"),
//     handle : z.string().min(3, "Product name must be at least 3 characters long")
//     .max(10, "Product name must be at most 10 characters long"),
//     capasity : z.string().min(1, "Product name must be at least 1 characters long")
//     .max(3, "Product name must be at most 3 characters long"),
//    price: z.string().min(1, "Price should be grater then 2 figure").max(4, "Max limit is 4 figure"),
//    secondprice : z.string()
//     .max(11, "Product name must be at most 11 characters long"),
//     image : z.string()
// })
// const [imageFile, setImageFile] = useState<File | null>(null);
// const ProductForm = () => {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             slug: "",
//             catagory: "",
//             image: "",
//             fuel: "",
//             handle: "",
//             capasity: "",
//             price: '',
//             secondprice: "",
//         },
//     })
//     function onSubmit(data: z.infer<typeof formSchema>) {
     
//         console.log(data)
//         const productData = {name: data.name, slug : data.slug , catagory : data.catagory, image : data.image ,  fuel: data.fuel, handle: data.handle, capasity: data.capasity,  price: Number(data.price), secondprice: data.secondprice}
//      addproduct(productData)
//       }

 
//   return (
//     <Form {...form} >
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-[20%] text-2xl my-20">
//       <FormField
//         control={form.control}
//         name="name"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Product name</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
// <FormField
//         control={form.control}
//         name="slug"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Product page name</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="catagory"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Category</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//             <FormField
//         control={form.control}
//         name="image"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Image</FormLabel>
//             <FormControl>
//               <Input type="file" id='image-p' className='w-full' placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
      
//             <FormField
//         control={form.control}
//         name="fuel"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Fuel tank</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//             <FormField
//         control={form.control}
//         name="handle"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Steering</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//             <FormField
//         control={form.control}
//         name="capasity"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Capasity</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
// <FormField
//         control={form.control}
//         name="price"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Price</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="secondprice"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>With discountided</FormLabel>
//             <FormControl>
//               <Input placeholder="" {...field} />
//             </FormControl>
           
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <Button type="submit">Submit</Button>
//     </form>
//   </Form>
//   )
// }


// export default ProductForm
"use client"
import React, { useState } from 'react';
import { Button } from "../components/ui/button";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface productData {
  name: string;
  slug: string;
  catagory: string;
  image?: string;  // image can be string or undefined
  fuel: string;
  handle: string;
  capacity: string;
  price: number;
  secondPrice?: string;
}

const addProduct = async (productData: productData) => {
  try {
    const result = await client.create({
      _type: 'cartwo',
      name: productData.name,
      slug: productData.slug,
      catagory: productData.catagory,
      image: productData.image,  // Image URL is passed here
      fuel: productData.fuel,
      handle: productData.handle,
      capacity: productData.capacity,
      price: productData.price,
      secondPrice: productData.secondPrice,
    });
    console.log('Product added successfully:', result);
  } catch (error) {
    console.log(error);
    
    console.error("Error Adding product")
  }
};

const formSchema = z.object({
  name: z.string().min(5, "Product name must be at least 5 characters long")
    .max(20, "Product name must be at most 20 characters long"),
  slug: z.string().min(4, "Slug must be at least 4 characters long")
    .max(15, "Slug must be at most 15 characters long"),
  catagory: z.string().min(2, "Category must be at least 2 characters long")
    .max(10, "Category must be at most 10 characters long"),
  fuel: z.string().min(1, "Fuel must be at least 1 character long")
    .max(3, "Fuel must be at most 3 characters long"),
  handle: z.string().min(3, "Handle must be at least 3 characters long")
    .max(10, "Handle must be at most 10 characters long"),
  capacity: z.string().min(1, "Capacity must be at least 1 character long")
    .max(3, "Capacity must be at most 3 characters long"),
  price: z.string().min(1, "Price should be greater than 2 figures").max(4, "Max limit is 4 figures"),
  secondPrice: z.string()
    .max(11, "Second price must be at most 11 characters long"),
  image: z.string().optional(),
});

const ProductForm = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);  // Initial image is undefined
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      catagory: "",
      image: undefined,
      fuel: "",
      handle: "",
      capacity: "",
      price: '',
      secondPrice: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const productData = {
      name: data.name,
      slug: data.slug,
      catagory: data.catagory,
      image: imageUrl,  // Set the generated image URL here
      fuel: data.fuel,
      handle: data.handle,
      capacity: data.capacity,
      price: Number(data.price),
      secondPrice: data.secondPrice,
    };

    addProduct(productData);  // Call the function to add the product to Sanity
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a FormData object to upload the image to Sanity
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your-upload-preset"); // Replace with your preset if using an image service

      // Upload the image to Sanity
      client.assets.upload('image', file).then((uploadedAsset) => {
        const imageUrl = urlFor(uploadedAsset).url();  // Generate image URL
        setImageUrl(imageUrl);  // Set the image URL to state
      }).catch(error => {
        console.error("Error uploading image:", error);
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-[20%] text-2xl my-20">
      <div>
        <label>Product Name</label>
        <input {...form.register("name")} />
      </div>
      <div>
        <label>Slug</label>
        <input {...form.register("slug")} />
      </div>
      <div>
        <label>Catagory</label>
        <input {...form.register("catagory")} />
      </div>
      <div>
        <label>Image</label>
        <input type="file" onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="Uploaded Image" width={200} />}  {/* Image preview */}
      </div>
      <div>
        <label>Fuel</label>
        <input {...form.register("fuel")} />
      </div>
      <div>
        <label>Handle</label>
        <input {...form.register("handle")} />
      </div>
      <div>
        <label>Capacity</label>
        <input {...form.register("capacity")} />
      </div>
      <div>
        <label>Price</label>
        <input {...form.register("price")} />
      </div>
      <div>
        <label>Second Price</label>
        <input {...form.register("secondPrice")} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProductForm;

