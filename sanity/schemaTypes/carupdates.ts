import { defineField, defineType } from "sanity";

export const carupdates = defineType({
  name: "carupdates",
  title: "Car updates",
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
      type: "string",
      description: "Car Serial no.",
      
     
    },
    {
      name: "category",
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
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
       
      }, 
  ],
});
