
export default function header() {
  
    

    return (
        <>
            <div>jj</div>
        </>
    )
}
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const reviewData = {
//       slug: post?.slug.current,  // Ensure 'slug' from the current post
//       rating,
//       reviewText,
//       user,
//     };
  
//     // Step 1: Submit the review data to the API route
//     const res = await fetch('/api/review', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(reviewData),
//     });
  
//     const data = await res.json();
  
//     if (res.status === 200) {
//       const newRating = data; // Assuming the backend returns the new rating document's data
//       const carSlug = post?.slug.current;
  
//       if (carSlug) {
//         try {
//           // Step 2: Find the car document by slug and get the document ID
//           const carDoc = await sanityClient.fetch(`*[_type == "cars" && slug.current == $slug][0]`, { slug: carSlug });
  
//           if (carDoc && carDoc._id) {
//             // Step 3: Append the new rating reference to the car document's ratings array
//             const updatedCar = await sanityClient2
//               .patch(carDoc._id) // Use the car's document ID
//               .setIfMissing({ ratings: [] }) // Ensure ratings array exists
//               .append('ratings', [
//                 {
//                   _type: 'reference',
//                   _ref: newRating._id, // Use the _id of the newly created rating document
//                 },
//               ])
//               .commit();
  
//             // Step 4: Update the 'post' state with the updated car data, including new ratings
//             setPost(updatedCar); // This will update the 'post' state with all the car details and new ratings
  
//             alert('Review submitted and ratings updated successfully!');
//           } else {
//             alert('Error: Car document not found');
//           }
//         } catch (error) {
//           console.error("Error updating the car document:", error);
//           alert("Failed to update the car's ratings.");
//         }
//       } else {
//         alert('Error: Car slug is undefined');
//       }
//     } else {
//       alert(`Error: ${data.message}`);
//     }
//   };
//  