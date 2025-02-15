
// import { NextRequest, NextResponse } from "next/server";
// import { join } from "path";
// import { writeFile, unlink } from "fs/promises";  
// import { existsSync, mkdirSync } from "fs";

// // Sample cars data to simulate database
// const posts = [
//   { id: 1, name: 'Keemigsegg', category: 'Sport', image: '/images/car.png', fuel: '90', handle: 'Manual', capasity: '2', price: 99, secondprice: '100', carvalue: "Popular Car" },
//   { id: 2, name: 'Nissan GT-R', category: 'Sport', image: '/images/car2.png', fuel: '80', handle: 'Automatic', capasity: '4', price: 80, secondprice: '100', carvalue: "Popular Car" },
//   { id: 3, name: 'Rolls - Royce' , category : 'Sedan',image : '/images/car3.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 96 , secondprice : '' ,carvalue : "popular Car" },
//   { id: 4, name: 'Nissan GT - R' , category : 'sport',image : '/images/car4.png' , fuel : '80',handle : 'Manual' , capasity : '2' ,price: 80 , secondprice : '100' ,carvalue : "popular Car" },
//   { id: 5, name: 'All New Rush' , category : 'SUV',image : '/images/car5.png' , fuel : '70',handle : 'Manual' , capasity : '6' ,price: 72 , secondprice : '100' ,carvalue : "Recomendation Car" },
//   { id: 6, name: 'CR-V' , category : 'SUV',image : '/images/car6.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//   { id: 7, name: 'All New Terios' , category : 'SUV',image : '/images/car7.png' , fuel : '90',handle : 'Manual' , capasity : '6' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
//   { id: 8, name: 'CR-V' , category : 'SUV',image : '/images/car8.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//   { id: 9, name: 'MG ZX Exclusice' , category : 'Hatchback',image : '/images/car9.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 76 , secondprice : '80' ,carvalue : "Recomendation Car" },
//   {id: 10, name: 'New MG ZS' , category : 'SUV',image : '/images/car10.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//   { id: 11, name: 'MG ZX Excite' , category : 'Hatchback',image : '/images/car11.png' , fuel : '90',handle : 'Manual' , capasity : '4' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
//   {id: 12, name: 'New MG ZS' , category : 'SUV',image : '/images/car12.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
// ];

// export async function handler(req: NextRequest) {
//   switch (req.method) {
//     case 'POST':
//       return handlePost(req);
//     case 'GET':
//       return handleGet();
//     case 'PUT':
//       return handlePut(req);
//     case 'DELETE':
//       return handleDelete(req);
//     default:
//       return new NextResponse('Method Not Allowed', { status: 405 });
//   }
// }

// // POST Request to add a new car
// async function handlePost(req: NextRequest) {
//   try {
//     const data = await req.formData();
//     const name = data.get('name') as string;
//     const category = data.get('category') as string;
//     const fuel = data.get('fuel') as string;
//     const handle = data.get('handle') as string;
//     const capasity = data.get('capasity') as string;
//     const price = data.get('price') as string;
//     const secondprice = data.get('secondprice') as string;
//     const carvalue = data.get('carvalue') as string;
//     const imageFile = data.get('image') as File;

//     if (!imageFile) {
//       return new NextResponse('No file uploaded', { status: 400 });
//     }

//     const tmpDir = join(process.cwd(), 'public/images');
//     if (!existsSync(tmpDir)) {
//       mkdirSync(tmpDir, { recursive: true });
//     }

//     const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//     const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
//     await writeFile(filePath, imageBuffer);

//     const newCar = {
//       id: posts.length + 1,
//       name: name || '',
//       category: category || '',
//       fuel: fuel || '',
//       handle: handle || '',
//       capasity: capasity || '',
//       price: parseFloat(price) || 0,
//       secondprice: secondprice || '',
//       carvalue: carvalue || '',
//       image: `/images/${imageFile.name}`,
//     };

//     posts.push(newCar);
//     return new NextResponse(JSON.stringify(newCar), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

// // GET Request to fetch all cars
// async function handleGet() {
//   return new NextResponse(JSON.stringify(posts), { status: 200 });
// }

// // PUT Request to update car details
// async function handlePut(req: NextRequest) {
//   try {
//     const data = await req.formData();
//     const id = parseInt(data.get('id') as string);
//     const name = data.get('name') as string;
//     const category = data.get('category') as string;
//     const fuel = data.get('fuel') as string;
//     const handle = data.get('handle') as string;
//     const capasity = data.get('capasity') as string;
//     const price = data.get('price') as string;
//     const secondprice = data.get('secondprice') as string;
//     const carvalue = data.get('carvalue') as string;
//     const imageFile = data.get('image') as File;

//     const carToUpdate = posts.find(car => car.id === id);

//     if (!carToUpdate) {
//       return new NextResponse('Car not found', { status: 404 });
//     }

//     if (imageFile) {
//       const oldImagePath = join(process.cwd(), 'public', carToUpdate.image);
//       await unlink(oldImagePath).catch(() => console.log('Old image not found'));

//       const tmpDir = join(process.cwd(), 'public/images');
//       if (!existsSync(tmpDir)) {
//         mkdirSync(tmpDir, { recursive: true });
//       }

//       const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//       const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
//       await writeFile(filePath, imageBuffer);
//       carToUpdate.image = `/images/${imageFile.name}`;
//     }

//     carToUpdate.name = name || carToUpdate.name;
//     carToUpdate.category = category || carToUpdate.category;
//     carToUpdate.fuel = fuel || carToUpdate.fuel;
//     carToUpdate.handle = handle || carToUpdate.handle;
//     carToUpdate.capasity = capasity || carToUpdate.capasity;
//     carToUpdate.price = parseFloat(price) || carToUpdate.price;
//     carToUpdate.secondprice = secondprice || carToUpdate.secondprice;
//     carToUpdate.carvalue = carvalue || carToUpdate.carvalue;

//     return new NextResponse(JSON.stringify(carToUpdate), { status: 200 });
//   } catch (error) {
//     console.error('Error updating car:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

// // DELETE Request to delete a car
// async function handleDelete(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     const carIndex = posts.findIndex(car => car.id === id);

//     if (carIndex === -1) {
//       return new NextResponse('Car not found', { status: 404 });
//     }

//     const carToDelete = posts[carIndex];
//     const imagePath = join(process.cwd(), 'public', carToDelete.image);
//     await unlink(imagePath).catch(() => console.log('Image not found'));

//     posts.splice(carIndex, 1);

//     return new NextResponse('Car deleted successfully', { status: 200 });
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import { join } from "path";
// import { writeFile, unlink } from "fs/promises";  // Added unlink for deleting files
// import { existsSync, mkdirSync } from "fs";

// // Sample cars data to simulate database
// let posts = [
//   { id: 1, name: 'Keemigsegg', category: 'Sport', image: '/images/car.png', fuel: '90', handle: 'Manual', capasity: '2', price: 99, secondprice: '100', carvalue: "Popular Car" },
//   { id: 2, name: 'Nissan GT-R', category: 'Sport', image: '/images/car2.png', fuel: '80', handle: 'Automatic', capasity: '4', price: 80, secondprice: '100', carvalue: "Popular Car" },
//     { id: 3, name: 'Rolls - Royce' , category : 'Sedan',image : '/images/car3.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 96 , secondprice : '' ,carvalue : "popular Car" },
//    { id: 4, name: 'Nissan GT - R' , category : 'sport',image : '/images/car4.png' , fuel : '80',handle : 'Manual' , capasity : '2' ,price: 80 , secondprice : '100' ,carvalue : "popular Car" },
//    { id: 5, name: 'All New Rush' , category : 'SUV',image : '/images/car5.png' , fuel : '70',handle : 'Manual' , capasity : '6' ,price: 72 , secondprice : '100' ,carvalue : "Recomendation Car" },
//    { id: 6, name: 'CR-V' , category : 'SUV',image : '/images/car6.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//    { id: 7, name: 'All New Terios' , category : 'SUV',image : '/images/car7.png' , fuel : '90',handle : 'Manual' , capasity : '6' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
//    { id: 8, name: 'CR-V' , category : 'SUV',image : '/images/car8.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//    { id: 9, name: 'MG ZX Exclusice' , category : 'Hatchback',image : '/images/car9.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 76 , secondprice : '80' ,carvalue : "Recomendation Car" },
//    {id: 10, name: 'New MG ZS' , category : 'SUV',image : '/images/car10.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//    { id: 11, name: 'MG ZX Excite' , category : 'Hatchback',image : '/images/car11.png' , fuel : '90',handle : 'Manual' , capasity : '4' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
//    {id: 12, name: 'New MG ZS' , category : 'SUV',image : '/images/car12.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
// ];

// export const runtime = "edge";

// // POST Request to add a new car
// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.formData();  // Extract form data

//     const name = data.get('name') as string;
//     const category = data.get('category') as string;
//     const fuel = data.get('fuel') as string;
//     const handle = data.get('handle') as string;
//     const capasity = data.get('capasity') as string;
//     const price = data.get('price') as string;
//     const secondprice = data.get('secondprice') as string;
//     const carvalue = data.get('carvalue') as string;
    
//     const imageFile = data.get('image') as File;

//     if (!imageFile) {
//       return new NextResponse('No file uploaded', { status: 400 });
//     }

//     const tmpDir = join(process.cwd(), 'public/images');
//     if (!existsSync(tmpDir)) {
//       mkdirSync(tmpDir, { recursive: true });
//     }

//     const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//     const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
//     await writeFile(filePath, imageBuffer);

//     const newCar = {
//       id: posts.length + 1,
//       name: name || '',
//       category: category || '',
//       fuel: fuel || '',
//       handle: handle || '',
//       capasity: capasity || '',
//       price: parseFloat(price) || 0,
//       secondprice: secondprice || '',
//       carvalue: carvalue || '',
//       image: `/images/${imageFile.name}`, // Store the image path
//     };

//     posts.push(newCar);
//     return new NextResponse(JSON.stringify(newCar), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

// // GET Request to fetch all cars
// export async function GET(req: NextRequest) {
//   return new NextResponse(JSON.stringify(posts), { status: 200 });
// }

// // PUT Request to update car details
// // PUT Request to update car details
// export async function PUT(req: NextRequest) {
//   try {
//     const data = await req.formData();
    
//     const id = parseInt(data.get('id') as string);
//     const name = data.get('name') as string;
//     const category = data.get('category') as string;
//     const fuel = data.get('fuel') as string;
//     const handle = data.get('handle') as string;
//     const capasity = data.get('capasity') as string;
//     const price = data.get('price') as string;
//     const secondprice = data.get('secondprice') as string;
//     const carvalue = data.get('carvalue') as string;
    
//     const imageFile = data.get('image') as File;

//     let carToUpdate = posts.find(car => car.id === id);

//     if (!carToUpdate) {
//       return new NextResponse('Car not found', { status: 404 });
//     }

//     // If a new image is uploaded, we will delete the old image and upload the new one
//     if (imageFile) {
//       // Delete old image if it exists
//       const oldImagePath = join(process.cwd(), 'public', carToUpdate.image);
//       await unlink(oldImagePath).catch(() => console.log('Old image not found'));

//       const tmpDir = join(process.cwd(), 'public/images');
//       if (!existsSync(tmpDir)) {
//         mkdirSync(tmpDir, { recursive: true });
//       }

//       const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//       const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
//       await writeFile(filePath, imageBuffer);
//       carToUpdate.image = `/images/${imageFile.name}`;  // Update image path
//     }

//     // Update car data
//     carToUpdate.name = name || carToUpdate.name;
//     carToUpdate.category = category || carToUpdate.category;
//     carToUpdate.fuel = fuel || carToUpdate.fuel;
//     carToUpdate.handle = handle || carToUpdate.handle;
//     carToUpdate.capasity = capasity || carToUpdate.capasity;
//     carToUpdate.price = parseFloat(price) || carToUpdate.price;
//     carToUpdate.secondprice = secondprice || carToUpdate.secondprice;
//     carToUpdate.carvalue = carvalue || carToUpdate.carvalue;

//     return new NextResponse(JSON.stringify(carToUpdate), { status: 200 });
//   } catch (error) {
//     console.error('Error updating car:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }


// // DELETE Request to delete a car
// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     const carIndex = posts.findIndex(car => car.id === id);

//     if (carIndex === -1) {
//       return new NextResponse('Car not found', { status: 404 });
//     }

//     // Delete the image file associated with the car
//     const carToDelete = posts[carIndex];
//     const imagePath = join(process.cwd(), 'public', carToDelete.image);
//     await unlink(imagePath).catch(() => console.log('Image not found'));

//     // Remove car from the posts array
//     posts.splice(carIndex, 1);

//     return new NextResponse('Car deleted successfully', { status: 200 });
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import { join } from "path";
// import { writeFile, unlink } from "fs/promises";  // Added unlink for deleting files
// import { existsSync, mkdirSync } from "fs";

// // Sample cars data to simulate database
//  const posts = [
//    { id: 1, name: 'Keemigsegg', category: 'Sport', image: '/images/car.png', fuel: '90', handle: 'Manual', capasity: '2', price: 99, secondprice: '100', carvalue: "Popular Car" },
//    { id: 2, name: 'Nissan GT-R', category: 'Sport', image: '/images/car2.png', fuel: '80', handle: 'Automatic', capasity: '4', price: 80, secondprice: '100', carvalue: "Popular Car" },
//      { id: 3, name: 'Rolls - Royce' , category : 'Sedan',image : '/images/car3.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 96 , secondprice : '' ,carvalue : "popular Car" },
//     { id: 4, name: 'Nissan GT - R' , category : 'sport',image : '/images/car4.png' , fuel : '80',handle : 'Manual' , capasity : '2' ,price: 80 , secondprice : '100' ,carvalue : "popular Car" },
//     { id: 5, name: 'All New Rush' , category : 'SUV',image : '/images/car5.png' , fuel : '70',handle : 'Manual' , capasity : '6' ,price: 72 , secondprice : '100' ,carvalue : "Recomendation Car" },
//     { id: 6, name: 'CR-V' , category : 'SUV',image : '/images/car6.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//     { id: 7, name: 'All New Terios' , category : 'SUV',image : '/images/car7.png' , fuel : '90',handle : 'Manual' , capasity : '6' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
//     { id: 8, name: 'CR-V' , category : 'SUV',image : '/images/car8.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//     { id: 9, name: 'MG ZX Exclusice' , category : 'Hatchback',image : '/images/car9.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 76 , secondprice : '80' ,carvalue : "Recomendation Car" },
//     {id: 10, name: 'New MG ZS' , category : 'SUV',image : '/images/car10.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//     { id: 11, name: 'MG ZX Excite' , category : 'Hatchback',image : '/images/car11.png' , fuel : '90',handle : 'Manual' , capasity : '4' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
//     {id: 12, name: 'New MG ZS' , category : 'SUV',image : '/images/car12.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
//  ];

// export const runtime = "nodejs"; // For server-side operations (use `nodejs` instead of `edge`)

// // POST Request to add a new car
// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.formData();  // Extract form data

//     const name = data.get('name') as string;
//     const category = data.get('category') as string;
//     const fuel = data.get('fuel') as string;
//     const handle = data.get('handle') as string;
//     const capasity = data.get('capasity') as string;
//     const price = data.get('price') as string;
//     const secondprice = data.get('secondprice') as string;
//     const carvalue = data.get('carvalue') as string;
    
//     const imageFile = data.get('image') as File;

//     if (!imageFile) {
//       return new NextResponse('No file uploaded', { status: 400 });
//     }

//     const tmpDir = join(process.cwd(), 'public/images');
//     if (!existsSync(tmpDir)) {
//       mkdirSync(tmpDir, { recursive: true });
//     }

//     const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//     const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
//     await writeFile(filePath, imageBuffer);

//     const newCar = {
//       id: posts.length + 1,
//       name: name || '',
//       category: category || '',
//       fuel: fuel || '',
//       handle: handle || '',
//       capasity: capasity || '',
//       price: parseFloat(price) || 0,
//       secondprice: secondprice || '',
//       carvalue: carvalue || '',
//       image: `/images/${imageFile.name}`, // Store the image path
//     };

//     posts.push(newCar);
//     return new NextResponse(JSON.stringify(newCar), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

// // GET Request to fetch all cars
// export async function GET() {
//   return new NextResponse(JSON.stringify(posts), { status: 200 });
// }

// // PUT Request to update car details
// export async function PUT(req: NextRequest) {
//   try {
//     const data = await req.formData();
    
//     const id = parseInt(data.get('id') as string);
//     const name = data.get('name') as string;
//     const category = data.get('category') as string;
//     const fuel = data.get('fuel') as string;
//     const handle = data.get('handle') as string;
//     const capasity = data.get('capasity') as string;
//     const price = data.get('price') as string;
//     const secondprice = data.get('secondprice') as string;
//     const carvalue = data.get('carvalue') as string;
    
//     const imageFile = data.get('image') as File;

//     const carToUpdate = posts.find(car => car.id === id);

//     if (!carToUpdate) {
//       return new NextResponse('Car not found', { status: 404 });
//     }

//     // If a new image is uploaded, we will delete the old image and upload the new one
//     if (imageFile) {
//       // Delete old image if it exists
//       const oldImagePath = join(process.cwd(), 'public', carToUpdate.image);
//       await unlink(oldImagePath).catch(() => console.log('Old image not found'));

//       const tmpDir = join(process.cwd(), 'public/images');
//       if (!existsSync(tmpDir)) {
//         mkdirSync(tmpDir, { recursive: true });
//       }

//       const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
//       const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
//       await writeFile(filePath, imageBuffer);
//       carToUpdate.image = `/images/${imageFile.name}`;  // Update image path
//     }

//     // Update car data
//     carToUpdate.name = name || carToUpdate.name;
//     carToUpdate.category = category || carToUpdate.category;
//     carToUpdate.fuel = fuel || carToUpdate.fuel;
//     carToUpdate.handle = handle || carToUpdate.handle;
//     carToUpdate.capasity = capasity || carToUpdate.capasity;
//     carToUpdate.price = parseFloat(price) || carToUpdate.price;
//     carToUpdate.secondprice = secondprice || carToUpdate.secondprice;
//     carToUpdate.carvalue = carvalue || carToUpdate.carvalue;

//     return new NextResponse(JSON.stringify(carToUpdate), { status: 200 });
//   } catch (error) {
//     console.error('Error updating car:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

// // DELETE Request to delete a car
// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     const carIndex = posts.findIndex(car => car.id === id);

//     if (carIndex === -1) {
//       return new NextResponse('Car not found', { status: 404 });
//     }

//     // Delete the image file associated with the car
//     const carToDelete = posts[carIndex];
//     const imagePath = join(process.cwd(), 'public', carToDelete.image);
//     await unlink(imagePath).catch(() => console.log('Image not found'));

//     // Remove car from the posts array
//     posts.splice(carIndex, 1);

//     return new NextResponse('Car deleted successfully', { status: 200 });
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";  // Added unlink for deleting files
import { existsSync, mkdirSync } from "fs";

// Sample cars data to simulate database
  const posts = [
    { id: 1, name: 'Keemigsegg', category: 'Sport', image: '/images/car.png', fuel: '90', handle: 'Manual', capasity: '2', price: 99, secondprice: '100', carvalue: "Popular Car" },
    { id: 2, name: 'Nissan GT-R', category: 'Sport', image: '/images/car2.png', fuel: '80', handle: 'Automatic', capasity: '4', price: 80, secondprice: '100', carvalue: "Popular Car" },
      { id: 3, name: 'Rolls - Royce' , category : 'Sedan',image : '/images/car3.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 96 , secondprice : '' ,carvalue : "popular Car" },
     { id: 4, name: 'Nissan GT - R' , category : 'sport',image : '/images/car4.png' , fuel : '80',handle : 'Manual' , capasity : '2' ,price: 80 , secondprice : '100' ,carvalue : "popular Car" },
     { id: 5, name: 'All New Rush' , category : 'SUV',image : '/images/car5.png' , fuel : '70',handle : 'Manual' , capasity : '6' ,price: 72 , secondprice : '100' ,carvalue : "Recomendation Car" },
     { id: 6, name: 'CR-V' , category : 'SUV',image : '/images/car6.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
     { id: 7, name: 'All New Terios' , category : 'SUV',image : '/images/car7.png' , fuel : '90',handle : 'Manual' , capasity : '6' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
     { id: 8, name: 'CR-V' , category : 'SUV',image : '/images/car8.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
     { id: 9, name: 'MG ZX Exclusice' , category : 'Hatchback',image : '/images/car9.png' , fuel : '70',handle : 'Manual' , capasity : '4' ,price: 76 , secondprice : '80' ,carvalue : "Recomendation Car" },
     {id: 10, name: 'New MG ZS' , category : 'SUV',image : '/images/car10.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
     { id: 11, name: 'MG ZX Excite' , category : 'Hatchback',image : '/images/car11.png' , fuel : '90',handle : 'Manual' , capasity : '4' ,price: 74 , secondprice : '' ,carvalue : "Recomendation Car" },
     {id: 12, name: 'New MG ZS' , category : 'SUV',image : '/images/car12.png' , fuel : '80',handle : 'Manual' , capasity : '6' ,price: 80 , secondprice : '' ,carvalue : "Recomendation Car" },
  ];

// POST Request to add a new car
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();  // Extract form data

    const name = data.get('name') as string;
    const category = data.get('category') as string;
    const fuel = data.get('fuel') as string;
    const handle = data.get('handle') as string;
    const capasity = data.get('capasity') as string;
    const price = data.get('price') as string;
    const secondprice = data.get('secondprice') as string;
    const carvalue = data.get('carvalue') as string;
    
    const imageFile = data.get('image') as File;

    if (!imageFile) {
      return new NextResponse('No file uploaded', { status: 400 });
    }

    const tmpDir = join(process.cwd(), 'public/images');
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
    await writeFile(filePath, imageBuffer);

    const newCar = {
      id: posts.length + 1,
      name: name || '',
      category: category || '',
      fuel: fuel || '',
      handle: handle || '',
      capasity: capasity || '',
      price: parseFloat(price) || 0,
      secondprice: secondprice || '',
      carvalue: carvalue || '',
      image: `/images/${imageFile.name}`, // Store the image path
    };

    posts.push(newCar);
    return new NextResponse(JSON.stringify(newCar), { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// GET Request to fetch all cars
export async function GET(req: NextRequest) {
  console.log(req);
  
  return new NextResponse(JSON.stringify(posts), { status: 200 });
}

// PUT Request to update car details
export async function PUT(req: NextRequest) {
  try {
    const data = await req.formData();
    
    const id = parseInt(data.get('id') as string); // Parse the car ID
    const name = data.get('name') as string;
    const category = data.get('category') as string;
    const fuel = data.get('fuel') as string;
    const handle = data.get('handle') as string;
    const capasity = data.get('capasity') as string;
    const price = data.get('price') as string;
    const secondprice = data.get('secondprice') as string;
    const carvalue = data.get('carvalue') as string;
    
    const imageFile = data.get('image') as File;

    const carToUpdate = posts.find(car => car.id === id); // Find car by ID

    if (!carToUpdate) {
      return new NextResponse('Car not found', { status: 404 });
    }

    // If a new image is uploaded, we will delete the old image and upload the new one
    if (imageFile) {
      // Delete old image if it exists
      const oldImagePath = join(process.cwd(), 'public', carToUpdate.image);
      await unlink(oldImagePath).catch(() => console.log('Old image not found'));

      const tmpDir = join(process.cwd(), 'public/images');
      if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir, { recursive: true });
      }

      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const filePath = join(tmpDir, `${Date.now()}-${imageFile.name}`);
      await writeFile(filePath, imageBuffer);
      carToUpdate.image = `/images/${imageFile.name}`;  // Update image path
    }

    // Update car data
    carToUpdate.name = name || carToUpdate.name;
    carToUpdate.category = category || carToUpdate.category;
    carToUpdate.fuel = fuel || carToUpdate.fuel;
    carToUpdate.handle = handle || carToUpdate.handle;
    carToUpdate.capasity = capasity || carToUpdate.capasity;
    carToUpdate.price = parseFloat(price) || carToUpdate.price;
    carToUpdate.secondprice = secondprice || carToUpdate.secondprice;
    carToUpdate.carvalue = carvalue || carToUpdate.carvalue;

    return new NextResponse(JSON.stringify(carToUpdate), { status: 200 });
  } catch (error) {
    console.error('Error updating car:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE Request to delete a car
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json(); // Get car data from request body
    const { id } = data; // Get car ID from the request body
    const carIndex = posts.findIndex(car => car.id === id); // Find the car by ID

    if (carIndex === -1) {
      return new NextResponse('Car not found', { status: 404 });
    }

    // Delete the image file associated with the car
    const carToDelete = posts[carIndex];
    const imagePath = join(process.cwd(), 'public', carToDelete.image);
    await unlink(imagePath).catch(() => console.log('Image not found'));

    // Remove car from the posts array
    posts.splice(carIndex, 1);

    return new NextResponse('Car deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting car:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
