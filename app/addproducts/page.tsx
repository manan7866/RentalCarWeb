"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Products from '@/components/Products';
import { LuImageUp } from "react-icons/lu";
import {client} from "@/sanityClient"
interface CarData {
  id: number;
  name: string;
  catagory: string;
  fuel: string;
  handle: string;
  capasity: string;
  price: number;
  secondprice: string;
  carvalue: string;
  image: string | File | null; // Image can be a URL, File, or null
}
  // Import your Sanity client

// Function to fetch and upload the image
 const fetchAndUploadImage = async (imageUrl: string) => {
  try {
    // 1. Fetch the image from the URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
    }

    const imageBlob = await imageResponse.blob(); // Convert image response to blob

    // 2. Validate if it's a proper image
    if (!imageBlob.type.startsWith('image/')) {
      throw new Error('Invalid image type');
    }

    // 3. Convert the image to ArrayBuffer
    const buffer = await imageBlob.arrayBuffer();

    // 4. Upload the image to Sanity
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: imageUrl.split('/').pop(),  // Extract filename from the URL
    });

    // 5. Return the Sanity asset reference (_id)
    return asset._id;

  } catch (error) {
    console.error('❌ Failed to upload image:', imageUrl, error);
    throw error;
  }
};

// Function to fetch car data and push it to Sanity
 const pushCarsToSanity = async () => {
  try {
    // API se car data fetch karna
    const response = await fetch('/api/cars');
    if (!response.ok) {
      throw new Error('Failed to fetch cars from API');
    }
    const cars = await response.json();

    // Loop through all cars
    for (const car of cars) {
      // Check if the car already exists in Sanity
      const existingCar = await client.fetch(`*[_type == "cars" && _id == "cars-${car.id}"]`);
      
      // Agar car already exists to skip the insertion
      if (existingCar.length > 0) {
        console.log(`Car with ID cars-${car.id} already exists in Sanity.`);
        continue; // Skip this car and move to the next one
      }

      let imageRef = '';
      
      // Agar car mein image hai to Sanity mein upload karenge
      if (car.image) {
        imageRef = await fetchAndUploadImage(car.image);
      }

      // Car document ka format Sanity ke liye
      const sanityProduct = {
        _id: `cars-${car.id}`, // Unique ID for car
        _type: 'cars', // Sanity document type
        name: car.name,
        price: car.price,
        secondprice: car.secondprice || '',  // Optional field
        catagory: car.catagory,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,  // Reference to uploaded image
          },
        },
        handle: car.handle,
        carvalue: car.carvalue,
        capasity: car.capasity,
        fuel: car.fuel,
      };

      // Sanity mein car document create karna
      await client.createOrReplace(sanityProduct);
      console.log(`✅ Imported car: ${sanityProduct.name}`);
    }

    console.log('✅ All cars have been imported!');
  } catch (error) {
    console.error('❌ Error pushing cars to Sanity:', error);
  }
};


const CarsPage = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pushSanity , setPushSanity] = useState(false)
  const [newCar, setNewCar] = useState<CarData>({
    id: 0,
    name: '',
    catagory: '',
    fuel: '',
    handle: '',
    capasity: '',
    price: 0,
    secondprice: '',
    carvalue: '',
    image: null, // Start with null for image
  });
  const [isEditing, setIsEditing] = useState(false); // To track whether we are editing a car

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
      setLoading(false);
    };

    fetchCars();
  }, []);

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', newCar.name);
    formData.append('catagory', newCar.catagory);
    formData.append('fuel', newCar.fuel);
    formData.append('handle', newCar.handle);
    formData.append('capasity', newCar.capasity);
    formData.append('price', newCar.price.toString());
    formData.append('secondprice', newCar.secondprice);
    formData.append('carvalue', newCar.carvalue);

    // Only append the image if it's not null or undefined
    if (newCar.image instanceof File) {
      formData.append('image', newCar.image); // If the image is a File object, append it
    } else if (newCar.image && typeof newCar.image === 'string') {
      formData.append('image', newCar.image); // If it's already a URL (string), append it
    }

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const addedCar = await res.json();
        setCars(prevCars => [...prevCars, addedCar]);
        alert('Car added successfully!');
        setNewCar({
          id: 0,
          name: '',
          catagory: '',
          fuel: '',
          handle: '',
          capasity: '',
          price: 0,
          secondprice: '',
          carvalue: '',
          image: null, // Reset image after successful form submission
        });
      } else {
        alert('Error adding car');
      }
    } catch (error) {
      alert('Error occurred while adding car');
      console.error("Error adding car:", error);
    }

    setLoading(false);
  };
  const handleAddAllToSanity = async () => {
    setPushSanity(true);
    await pushCarsToSanity();
    setPushSanity(false);
  };
  // Handle car deletion
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setLoading(true);
      try {
        const res = await fetch('/api/cars', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
  
        if (res.ok) {
          setCars(cars.filter((car) => car.id !== id));
          alert('Car deleted successfully');
        } else {
          alert('Error deleting the car');
        }
      } catch (error) {
        console.error(error);
        
        alert('Something went wrong');
      }
      setLoading(false);
    }
  };
  
  // Handle editing a car
  const handleEdit = (car: CarData) => {
    setIsEditing(true); // Set editing mode to true
    setNewCar(car); // Populate form with car details
  };

  const handleUpdateCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append('id', newCar.id.toString());
    formData.append('name', newCar.name);
    formData.append('catagory', newCar.catagory);
    formData.append('fuel', newCar.fuel);
    formData.append('handle', newCar.handle);
    formData.append('capasity', newCar.capasity);
    formData.append('price', newCar.price.toString());
    formData.append('secondprice', newCar.secondprice);
    formData.append('carvalue', newCar.carvalue);
  
    // Only append the image if it's not null or undefined
    if (newCar.image instanceof File) {
      formData.append('image', newCar.image); // If the image is a File object, append it
    } else if (newCar.image && typeof newCar.image === 'string') {
      formData.append('image', newCar.image); // If it's already a URL (string), append it
    }
  
    try {
      const res = await fetch('/api/cars', {
        method: 'PUT',
        body: formData,
      });
  
      if (res.ok) {
        const updatedCar = await res.json();
        setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
        alert('Car updated successfully!');
        setNewCar({
          id: 0,
          name: '',
          catagory: '',
          fuel: '',
          handle: '',
          capasity: '',
          price: 0,
          secondprice: '',
          carvalue: '',
          image: null,
        });
        setIsEditing(false); // Exit edit mode
      } else {
        alert('Error updating car');
      }
    } catch (error) {
      alert('Error occurred while updating car');
      console.error("Error updating car:", error);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="w-full h-auto px-14 py-20 flex flex-col justify-center gap-5 items-center">
      <button onClick={handleAddAllToSanity} className='py-10 px-16 bg-slate-200'>{pushSanity ? "Adding to all cars Sanity ..." : " Add to all cars Sanity"}</button>
      {/* Form to add or update car */}
      <form className="grid grid-cols-2 md:grid-cols-2 w-full gap-5" onSubmit={isEditing ? handleUpdateCar : handleAddCar}>
        <input
         className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          placeholder="Car Name"
          required
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.catagory}
          onChange={(e) => setNewCar({ ...newCar, catagory: e.target.value })}
          placeholder="Category"
          required
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.fuel}
          onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
          placeholder="Fuel"
          required
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.handle}
          onChange={(e) => setNewCar({ ...newCar, handle: e.target.value })}
          placeholder="Handle"
          required
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.capasity}
          onChange={(e) => setNewCar({ ...newCar, capasity: e.target.value })}
          placeholder="Capacity"
          required
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="number"
          value={newCar.price}
          onChange={(e) => setNewCar({ ...newCar, price: +e.target.value })}
          placeholder="Price"
          required
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.secondprice}
          onChange={(e) => setNewCar({ ...newCar, secondprice: e.target.value })}
          placeholder="Second Price"
        />
        <input
        className='w-full h-14 px-5 shadow-lg outline-none bg-slate-200 rounded-lg'
          type="text"
          value={newCar.carvalue}
          onChange={(e) => setNewCar({ ...newCar, carvalue: e.target.value })}
          placeholder="Car Value"
        />
       <div className='w-full bg-slate-200 py-10 px-6 flex gap-10 justify-between rounded-lg'>
 {/* Hidden file input */}
 <input
   type="file"
   id='file-upload'
   accept="image/*"
   onChange={  (e) =>
     setNewCar({ ...newCar, image: e.target.files ? e.target.files[0] : null })}
   required
   className="hidden-input" // Custom class for hiding the file input
 />   
 {/* LuImageUp Icon as clickable button */}
 <label htmlFor="file-upload" className=''>
   <LuImageUp size={100} />
  </label>

  {/* Display selected image if available */}
  {newCar.image && (
    <p className='w-[70%] flex flex-col justify-between items-center gap-8'>
      <p className='text-xl font-bold text-green-400'>Selected Car</p>
       <Image src={ typeof newCar.image === 'string' ? newCar.image : URL.createObjectURL(newCar.image) } alt="Selected" width={250} height={0} />
    </p>
  )}
 </div>
        <button className='text-xl bg-slate-200 py-10 px-20 rounded-lg' type="submit" disabled={loading}>
          {loading ? (isEditing ? 'Updating...' : 'Adding...') : isEditing ? 'Update Car' : 'Add Car'}
        </button>
      </form>

      {/* Display cars */}
      <h1>All Cars</h1>
      <div className=' w-full grid grid-cols-4 gap-x-4'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className=' rounded-lg py-2 my-6 bg-[#F6F7F9]' >
             <Products name={car.name} catagory={car.catagory} image={String(car.image)} price={car.price} fuel={car.fuel }  capasity={car.capasity}  />
             <div className='flex justify-end gap-4 px-6'>
             <button className='bg-green-400 rounded-lg py-3 px-6 my-2' onClick={() => handleEdit(car)}>Edit</button>
             <button className='bg-red-500 rounded-lg py-3 px-6 my-2' onClick={() => handleDelete(car.id)}>Delete</button>
             
             </div>
            </div>
         
          ))
        )}
      </div>
    </div>
  );
};

export default CarsPage;
