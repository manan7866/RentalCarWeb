// app/api/review/route.ts

import { NextResponse } from "next/server";


 import { client } from '@/sanityClient';

export async function POST(request: Request) {
  try {
    // Get the data from the request body
    const { slug, rating, reviewText, user ,userName,userImage } = await request.json();

    // Check if required fields are present
    if (!slug || !rating || !reviewText || !user) {
      return NextResponse.json({ message: 'All fields are required (slug, rating, reviewText, user)' }, { status: 400 });
    }

    // Check if the user has already rated this car
    const existingRating = await client.fetch(
      `*[_type == "rating" && carSlug == $slug && user == $user][0]`,
      { slug, user }
    );

    if (existingRating) {
      // If rating exists, update it (instead of creating new)
      const updatedRating = await client
        .patch(existingRating._id)
        .set({ rating, reviewText })
        .commit();
        
      return NextResponse.json(updatedRating, { status: 200 });
    } else {
      // If no rating exists, create a new rating
      const newRating = await client.create({
        _type: 'rating',
        carSlug: slug,
        rating,
        reviewText,
        user,
        createdAt: new Date().toISOString(),
        userName,
        userImage
      });

      return NextResponse.json(newRating, { status: 200 });
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ message: 'Error submitting review' }, { status: 500 });
  }
}
