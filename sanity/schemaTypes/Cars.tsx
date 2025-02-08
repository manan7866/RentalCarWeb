import { defineField, defineType } from "sanity";

export const Cars = defineType({
  name: "cars",
  title: "Cars",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter car name",
     
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Car Serial no.",
      options: {
        source: "name", // Slug will be generated based on the 'name' field
        maxLength: 96, // Max length for slug
      },
     
    },
    {
      name: "catagory",
      title: "Category",
      type: "string",
      description: "Car category",
     
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Select image",
      
    },
    {
      name: "fuel",
      title: "Fuel",
      type: "string",
      
    },
    {
      name: "handle",
      title: "Handling",
      type: "string",
      
    },
    {
      name: "capasity",
      title: "Capacity",
      type: "string",
     
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    
    },
    {
      name: "secondprice",
      title: "Second Price",
      type: "string",
     
    }, {
        name: "carvalue",
        title: "CarValue",
        type: "string",
        description: "Car Value",
       
      }, {
        name: 'ratings',
        title: 'Ratings',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'rating' }] }],
      },
  ],
});
