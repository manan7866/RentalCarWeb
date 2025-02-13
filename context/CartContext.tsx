import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface inCartArryType {
  slug : {current : string},
  fav : boolean,  
  name: string,
  category: string,
  image: string,
  fuel: string,
  handle: string,
  capasity: string,
  price: number,
  secondprice?: string
}
interface rentCar {
  slug : {current : string},
  name : string,
  category : string,
  image : string,
  price : number,
  rentalDate : string
}

interface CartType {
  fav : boolean;
  setFav : Dispatch<SetStateAction<boolean>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  category: string;
  setcategory: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  fuel: string;
  setFuel: Dispatch<SetStateAction<string>>;
  handle: string;
  setHandle: Dispatch<SetStateAction<string>>;
  capasity: string;
  setCapasity: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  secondprice?: string;
  setSecondprice: Dispatch<SetStateAction<string>>;
  favCars: inCartArryType[][];
  setFavCars: Dispatch<SetStateAction<inCartArryType[][]>>;
  rentalcar : rentCar[][],
  setRentCar : Dispatch<SetStateAction<rentCar[][]>>;
}

// Default values for the context
const defaultCart: CartType = {
  fav : false,
  setFav : ()=>{},
  name: '',
  setName: () => {},
  category: '',
  setcategory: () => {},
  image: '',
  setImage: () => {},
  fuel: '',
  setFuel: () => {},
  handle: '',
  setHandle: () => {},
  capasity: '',
  setCapasity: () => {},
  price: 0,
  setPrice: () => {},
  secondprice: '',
  setSecondprice: () => {},
  favCars: [],
  setFavCars: () => {},
  rentalcar : [],
  setRentCar : ()=>{}
};

// Creating the Cart Context
export const CartContext = createContext<CartType>(defaultCart);

// Cart Provider Component
export const CartProvider =({ children }: { children: React.ReactNode })  => {
  const [fav , setFav] = useState(false)
  const [name, setName] = useState('');
  const [category, setcategory] = useState('');
  const [image, setImage] = useState('');
  const [fuel, setFuel] = useState('');
  const [handle, setHandle] = useState('');
  const [capasity, setCapasity] = useState('');
  const [price, setPrice] = useState(0);
  const [secondprice, setSecondprice] = useState('');
  const [favCars, setFavCars] = useState<inCartArryType[][]>([]);
  const [rentalcar, setRentCar] =useState<rentCar[][]>([])

  return (
  <CartContext.Provider value={{
    fav,
    setFav,
    name,
    setName,
    category,
    setcategory,
    image,
    setImage,
    fuel,
    setFuel,
    handle,
    setHandle,
    capasity,
    setCapasity,
    price,
    setPrice,
    secondprice,
    setSecondprice,
    favCars,
    setFavCars,
    rentalcar,
    setRentCar
  }
}>{children}
</CartContext.Provider>
)
};

// Custom hook to use cart context

