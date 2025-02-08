// import { generateRandomKey } from '@/lib/utils';
import { defineField, defineType } from 'sanity';

function generateRandomKey() {
  return Math.random().toString(36).substring(2, 10); // Generates a 6-character random key
}

export const Rating = defineType({
  name: 'rating',
  title: 'Rating',
  type: 'document',
  fields: [
    {
      name: 'carSlug',
      title: 'Car Slug',
      type: 'string',
      description: 'The unique identifier for the car (slug)',
    },
    {
      name: 'user',
      title: 'User',
      type: 'string',
      description: 'Name of the user providing the review',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5), // Ensures rating is between 1 and 5
    },
    {
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      description: 'Review provided by the user',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name : 'userName',
     title : 'User name',
     type : "string"
    },
    {
      name : 'userImage',
      title : 'User image',
      type : 'string'
    }
  ],
});