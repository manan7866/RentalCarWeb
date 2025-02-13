"use client";

// import React, { useEffect, useState } from 'react';

// interface Post {
//   id: number;
//   title: string;
// }

// const PostsPage = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [title, setTitle] = useState('');
//   const [newTitle, setNewTitle] = useState('');
//   const [postId, setPostId] = useState<number | string>('');
//   const [deleteId, setDeleteId] = useState<number | string>('');

//   // Fetch posts when the component mounts
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     const response = await fetch('/api/hello');
//     const data = await response.json();
//     setPosts(data);
//   };

//   // Handle Add Post (POST request)
//   const handleAddPost = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await fetch('/api/hello', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title }),
//     });
//     const newPost = await response.json();
//     setPosts((prevPosts) => [...prevPosts, newPost]); // Add new post dynamically
//     setTitle('');
//   };

//   // Handle Edit Post (PUT request)
//   const handleEditPost = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await fetch('/api/hello', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id: postId, newTitle }),
//     });
//     const updatedPost = await response.json();
//     setPosts((prevPosts) =>
//       prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
//     );
//     setPostId('');
//     setNewTitle('');
//   };

//   // Handle Delete Post (DELETE request)
//   const handleDeletePost = async (deleteId: number) => {
//     const response = await fetch('/api/hello', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ deleteId }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert(data.message); // Show success message
//       // Remove the deleted post from UI
//       setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deleteId));
//     } else {
//       alert('Error deleting post: ' + data.message); // Show error message
//     }
//   };

//   return (
//     <div>
//       <h1>Posts</h1>

//       {/* Display posts */}
//       <ul>
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <li key={post.id}>
//               {post.title}
//               {/* Edit and Delete Buttons */}
//               <button onClick={() => { setPostId(post.id); setNewTitle(post.title); }}>Edit</button>
//               <button onClick={() => handleDeletePost(post.id)}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <p>No posts available</p>
//         )}
//       </ul>

//       {/* Add Post Form */}
//       <form onSubmit={handleAddPost}>
//         <input
//           type="text"
//           placeholder="Post Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button type="submit">Add Post</button>
//       </form>

//       {/* Edit Post Form */}
//       {postId && (
//         <form onSubmit={handleEditPost}>
//           <input
//             type="text"
//             placeholder="New Car Title"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//           />
//           <button type="submit">Update Post</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PostsPage;
// app/cars/[id]/page.tsx or app/page.tsx (depending on your file structure)

// app/cars/page.tsx

// import { GetServerSideProps } from 'next';
// import React, { useState } from 'react';

// // Car Data Interface
// interface CarData {
//   id: number;
//   name: string;
//   category: string;
//   fuel: string;
//   handle: string;
//   capasity: string;
//   price: string;
//   secondprice: string;
//   carvalue: string;
//   image: string;
// }

// interface CarsPageProps {
//   cars: CarData[];
// }

// const CarsPage = ({ cars }: CarsPageProps) => {
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async (id: number) => {
//     if (confirm('Are you sure you want to delete this car?')) {
//       setLoading(true);
//       const res = await fetch(`/api/hello`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert(data.message);
//         // After deleting, you may want to refetch the cars list or update the state
//         window.location.reload(); // Reload to update the UI after deletion
//       } else {
//         alert(data.message || 'Error deleting the car');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>All Cars</h1>
//       <div>
//         {cars.map((car) => (
//           <div key={car.id} style={{ border: '1px solid #ddd', marginBottom: '20px', padding: '10px' }}>
//             <img src={car.image} alt={car.name} width={100} />
//             <h2>{car.name}</h2>
//             <p>Category: {car.category}</p>
//             <p>Fuel: {car.fuel}</p>
//             <p>Price: {car.price}</p>
//             <p>Capacity: {car.capasity}</p>
//             <div>
//               <button onClick={() => window.location.href = `/cars/${car.id}`}>Edit</button>
//               <button onClick={() => handleDelete(car.id)} disabled={loading}>
//                 {loading ? 'Deleting...' : 'Delete'}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Fetch all cars using getServerSideProps
// export const getServerSideProps: GetServerSideProps = async () => {
//   // Fetch cars from the API
//   const res = await fetch('http://localhost:3000/api/hello');  // Make sure the URL is correct for your local setup or environment
//   const cars = await res.json();

//   return {
//     props: {
//       cars,
//     },
//   };
// };

// export default CarsPage;


// import React, { useState, useEffect } from 'react';

// interface CarData {
//   id: number;
//   name: string;
//   category: string;
//   fuel: string;
//   handle: string;
//   capasity: string;
//   price: string;
//   secondprice: string;
//   carvalue: string;
//   image: string;
// }

// interface CarPageProps {
//   car: CarData | null; // Expected a single car object or null
// }

// const AddEditCarPage = ({ car }: CarPageProps) => {
//   const [formData, setFormData] = useState<CarData>({
//     id: car ? car.id : 0, // Default value for id to 0 if no car passed
//     name: car ? car.name : '',
//     category: car ? car.category : '',
//     fuel: car ? car.fuel : '',
//     handle: car ? car.handle : '',
//     capasity: car ? car.capasity : '',
//     price: car ? car.price : '0', // Ensure it's a string if that's the expected type
//     secondprice: car ? car.secondprice : '',
//     carvalue: car ? car.carvalue : '',
//     image: car ? car.image : '',
//   });
//   const [loading, setLoading] = useState(false);

//   // Set form data if the car is passed
//   useEffect(() => {
//     if (car) {
//       setFormData({
//         id: car.id,
//         name: car.name,
//         category: car.category,
//         fuel: car.fuel,
//         handle: car.handle,
//         capasity: car.capasity,
//         price: car.price,
//         secondprice: car.secondprice,
//         carvalue: car.carvalue,
//         image: car.image,
//       });
//     }
//   }, [car]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/hello', {
//         method: car ? 'PUT' : 'POST', // PUT for editing, POST for adding
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert(car ? 'Car updated successfully!' : 'Car added successfully!');
//       } else {
//         alert('Error while saving the car');
//       }
//     } catch (error) {
//       setLoading(false);
//       alert('Something went wrong');
//     }
//   };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this car?')) {
//       setLoading(true);

//       try {
//         const res = await fetch('/api/hello', {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id: car?.id }),
//         });

//         const data = await res.json();
//         setLoading(false);

//         if (res.ok) {
//           alert('Car deleted successfully!');
//           window.location.href = '/'; // Redirect to the homepage or car listing
//         } else {
//           alert('Error deleting the car');
//         }
//       } catch (error) {
//         setLoading(false);
//         alert('Something went wrong during deletion');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>{car ? 'Edit Car' : 'Add New Car'}</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <label>Category:</label>
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />
//         <label>Fuel:</label>
//         <input
//           type="text"
//           name="fuel"
//           value={formData.fuel}
//           onChange={handleChange}
//           required
//         />
//         <label>Handle:</label>
//         <input
//           type="text"
//           name="handle"
//           value={formData.handle}
//           onChange={handleChange}
//           required
//         />
//         <label>Capacity:</label>
//         <input
//           type="text"
//           name="capasity"
//           value={formData.capasity}
//           onChange={handleChange}
//           required
//         />
//         <label>Price:</label>
//         <input
//           type="text"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//         <label>Second Price:</label>
//         <input
//           type="text"
//           name="secondprice"
//           value={formData.secondprice}
//           onChange={handleChange}
//         />
//         <label>Car Value:</label>
//         <input
//           type="text"
//           name="carvalue"
//           value={formData.carvalue}
//           onChange={handleChange}
//         />
//         <label>Image URL:</label>
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Saving...' : car ? 'Update Car' : 'Add Car'}
//         </button>
//       </form>
//       {car && (
//         <button onClick={handleDelete} disabled={loading}>
//           {loading ? 'Deleting...' : 'Delete Car'}
//         </button>
//       )}
//     </div>
//   );
// };



import React, { useState } from 'react';

interface CarData {
  name: string;
  category: string;
  fuel: string;
  handle: string;
  capasity: string;
  price: number;
  secondprice: string;
  carvalue: string;
  image: File | null;
}

const Page = () => {
  const [carData, setCarData] = useState<CarData>({
    name: '',
    category: '',
    fuel: '',
    handle: '',
    capasity: '',
    price: 0,
    secondprice: '',
    carvalue: '',
    image: null,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!carData.image) {
      console.error("No image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", carData.name);
      formData.append("category", carData.category);
      formData.append("fuel", carData.fuel);
      formData.append("handle", carData.handle);
      formData.append("capasity", carData.capasity);
      formData.append("price", carData.price.toString());
      formData.append("secondprice", carData.secondprice);
      formData.append("carvalue", carData.carvalue);
      formData.append("image", carData.image);  // Appending the image file

      const res = await fetch('/api/cars', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      console.log('Car added successfully');
    } catch (e) {
      console.error("Error adding car:", e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={carData.name}
          onChange={(e) => setCarData({ ...carData, name: e.target.value })}
          placeholder="Car Name"
          required
        />
        <input
          type="text"
          value={carData.category}
          onChange={(e) => setCarData({ ...carData, category: e.target.value })}
          placeholder="Category"
          required
        />
        <input
          type="text"
          value={carData.fuel}
          onChange={(e) => setCarData({ ...carData, fuel: e.target.value })}
          placeholder="Fuel"
          required
        />
        <input
          type="text"
          value={carData.handle}
          onChange={(e) => setCarData({ ...carData, handle: e.target.value })}
          placeholder="Handle"
          required
        />
        <input
          type="text"
          value={carData.capasity}
          onChange={(e) => setCarData({ ...carData, capasity: e.target.value })}
          placeholder="Capacity"
          required
        />
        <input
          type="number"
          value={carData.price}
          onChange={(e) => setCarData({ ...carData, price: +e.target.value })}
          placeholder="Price"
          required
        />
        <input
          type="text"
          value={carData.secondprice}
          onChange={(e) => setCarData({ ...carData, secondprice: e.target.value })}
          placeholder="Second Price"
        />
        <input
          type="text"
          value={carData.carvalue}
          onChange={(e) => setCarData({ ...carData, carvalue: e.target.value })}
          placeholder="Car Value"
        />
        <input
          type="file"
          onChange={(e) => setCarData({ ...carData, image: e.target.files ? e.target.files[0] : null })}
          required
        />
        <input type="submit" value="Add Car" />
      </form>
    </div>
  );
};

export default Page;


// {/* <div className='w-full bg-slate-200 py-10 px-6 flex gap-10 justify-between rounded-lg'>
// {/* Hidden file input */}
// <input
//   type="file"
//   id='file-upload'
//   accept="image/*"
//   onChange={handleImageUpload}
//   required
//   className="hidden-input" // Custom class for hiding the file input
// />   
// {/* LuImageUp Icon as clickable button */}
// <label htmlFor="file-upload" className=''>
//   <LuImageUp size={100} />
//  </label>

//  {/* Display selected image if available */}
//  {newCar.image && (
//    <p className='w-[70%] flex flex-col justify-between items-center gap-8'>
//      <p className='text-xl font-bold text-green-400'>Selected Car</p>
//       <img src={newCar.image} alt="Selected" width={250} height={0} />
//    </p>
//  )}
// </div> */}