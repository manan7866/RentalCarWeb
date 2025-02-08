// import axios from 'axios';
// import { client } from './sanityClient.js';

// async function uploadImageToSanity(imageUrl: string): Promise<string> {
//   try {
//     // Ensure imageUrl is a full URL by prepending the base URL
//     const fullImageUrl = `http://localhost:3000/api/cars${imageUrl}`;  // Assuming your server runs locally
//     console.log('Uploading image from URL:', fullImageUrl);

//     // Fetch the image from the URL and convert it to a buffer
//     const response = await axios.get(fullImageUrl, { responseType: 'arraybuffer' });
//     const buffer = Buffer.from(response.data);

//     // Upload the image to Sanity
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop(), // Extract the filename from URL
//     });

//     // Debugging: Log the asset returned by Sanity
//     console.log('Image uploaded successfully:', asset);

//     return asset._id; // Return the uploaded image asset reference ID
//   } catch (error) {
//     console.error('❌ Failed to upload image:', imageUrl, error);
//     throw error;
//   }
// }

// async function importData() {
//   try {
//     // Fetch data from external API
//     const response = await axios.get('http://localhost:3000/api/cars');
//     const products = response.data;

//     // Iterate over the products
//     for (const product of products) {
//       let imageRef = '';

//       // Upload image and get asset reference if it exists
//       if (product.image) {
//         imageRef = await uploadImageToSanity(product.image);
//       }

//       const sanityProduct = {
//         _id: `cars-${product.id}`, // Prefix the ID to ensure validity
//         _type: 'cars',
//         name: product.name,
//         price: product.price,
//         seconprice: product.secondprice,
//         catagory: product.catagory,
//         image: {
//           _type: 'image',
//           asset: {
//             _type: 'reference',
//             _ref: imageRef, // Set the correct asset reference ID
//           },
//         },
//         handle: product.handle,
//         carvalue: product.carvalue,
//         capasity: product.capasity,
//         fuel: product.fuel,
//       };

//       // Log the product before attempting to upload it to Sanity
//       console.log('Uploading product:', sanityProduct);

//       // Import data into Sanity
//       await client.createOrReplace(sanityProduct);
//       console.log(`✅ Imported product: ${sanityProduct.name}`);
//     }

//     console.log('✅ Data import completed!');
//   } catch (error) {
//     console.error('❌ Error importing data:', error);
//   }
// }

// importData();
import { client } from './sanityClient'; // Sanity client import karenge
import * as fs from 'fs';  // fs module ko * as syntax se import karein
import { join } from 'path';  // Path module import karenge

async function uploadImageToSanity(imageUrl: string): Promise<string> {
  try {
    // Image ko Sanity me upload karne ke liye
    const fullImageUrl = `/api/cars${imageUrl}`;  // Assuming your server runs locally

    // Image ko fetch karna aur arrayBuffer() ke zariye binary data lena
    const response = await fetch(fullImageUrl);
    const buffer = await response.arrayBuffer(); // Use arrayBuffer instead of buffer()

    // Sanity me image upload karna
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: imageUrl.split('/').pop(), // Extracting filename from URL
    });

    return asset._id; // Image ka asset ID return karenge
  } catch (error) {
    console.error('❌ Failed to upload image:', imageUrl, error);
    throw error;
  }
}

async function importData() {
  try {
    // API se car data fetch karna
    const response = await fetch('http://localhost:3000/api/cars');
    const products = await response.json();

    for (const product of products) {
      let imageRef = '';

      // Agar image hai to Sanity me upload karenge
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Product data ko Sanity ke format me convert karenge
      const sanityProduct = {
        _id: `cars-${product.id}`,  // Unique ID for product
        _type: 'cars',  // Document type
        name: product.name,
        price: product.price,
        seconprice: product.secondprice,
        catagory: product.catagory,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,  // Image ka reference ID
          },
        },
        handle: product.handle,
        carvalue: product.carvalue,
        capasity: product.capasity,
        fuel: product.fuel,
      };

      console.log('Uploading product:', sanityProduct);

      // Data ko Sanity me import karna
      await client.createOrReplace(sanityProduct);
      console.log(`✅ Imported product: ${sanityProduct.name}`);
    }

    console.log('✅ Data import completed!');
  } catch (error) {
    console.error('❌ Error importing data:', error);
  }
}

importData();  // Function call karenge
