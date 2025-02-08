// import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

// // Filter context create kar rahe hain
// const defaultFilterState = {
//   twop: false,
//   setTwop: () => {},
//   fourp: false,
//   setFourp: () => {},
//   sixp: false,
//   setSixp: () => {},
//   ischeked: false,
//   setischeked: () => {},
//   issuv: false,
//   setsuv: () => {},
//   issudan: false,
//   setsudan: () => {},
//   ishb: false,
//   sethb: () => {},
//   value: 70,
//   setValue: () => {},
//   trigr: false, // Added trigr
//   setTrigr: () => {} // Added setTrigr
// };
// const FilterContext = createContext(defaultFilterState);

// // FilterContext ka provider jo filter states ko share karega
// export const FilterProvider = ({ children }) => {
//   // States for filters
//   const [twop, setTwop] = useState(false);  
//   const [fourp, setFourp] = useState(false);  
//   const [sixp, setSixp] = useState(false);  
//   const [ischeked, setischeked] = useState(false);  
//   const [issuv, setsuv] = useState(false);  
//   const [issudan, setsudan] = useState(false);  
//   const [ishb, sethb] = useState(false);  
//   const [value, setValue] = useState(70); 
//   const [trigr, setTrigr] = useState(false); 

//   return (
//     <FilterContext.Provider value={{
//       twop, setTwop,
//       fourp, setFourp,
//       sixp, setSixp,
//       ischeked, setischeked,
//       issuv, setsuv,
//       issudan, setsudan,
//       ishb, sethb,
//       value, setValue,
//       trigr, setTrigr 
//     }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// // Custom hook to access filter state in any component
// export const useFilter = () => useContext(FilterContext);
// import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

// // Define the types for the context
// interface FilterContextType {
//   twop: boolean;
//   setTwop: Dispatch<SetStateAction<boolean>>;
//   fourp: boolean;
//   setFourp: Dispatch<SetStateAction<boolean>>;
//   sixp: boolean;
//   setSixp: Dispatch<SetStateAction<boolean>>;
//   ischeked: boolean;
//   setischeked: Dispatch<SetStateAction<boolean>>;
//   issuv: boolean;
//   setsuv: Dispatch<SetStateAction<boolean>>;
//   issudan: boolean;
//   setsudan: Dispatch<SetStateAction<boolean>>;
//   ishb: boolean;
//   sethb: Dispatch<SetStateAction<boolean>>;
//   value: number;
//   setValue: Dispatch<SetStateAction<number>>;
//   trigr: boolean;
//   setTrigr: Dispatch<SetStateAction<boolean>>;
// }

// // Default context values
// const defaultFilterState: FilterContextType = {
//   twop: false,
//   setTwop: () => {},
//   fourp: false,
//   setFourp: () => {},
//   sixp: false,
//   setSixp: () => {},
//   ischeked: false,
//   setischeked: () => {},
//   issuv: false,
//   setsuv: () => {},
//   issudan: false,
//   setsudan: () => {},
//   ishb: false,
//   sethb: () => {},
//   value: 70,
//   setValue: () => {},
//   trigr: false,
//   setTrigr: () => {}
// };

// // Create the context with default values
// export const FilterContext = createContext<FilterContextType>(defaultFilterState);

// // FilterProvider to provide context to the rest of the app
// export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
//   // Define states and their setters
//   const [twop, setTwop] = useState(false);
//   const [fourp, setFourp] = useState(false);
//   const [sixp, setSixp] = useState(false);
//   const [ischeked, setischeked] = useState(false);
//   const [issuv, setsuv] = useState(false);
//   const [issudan, setsudan] = useState(false);
//   const [ishb, sethb] = useState(false);
//   const [value, setValue] = useState(70);
//   const [trigr, setTrigr] = useState(false);

//   return (
//     <FilterContext.Provider value={{
//       twop, setTwop,
//       fourp, setFourp,
//       sixp, setSixp,
//       ischeked, setischeked,
//       issuv, setsuv,
//       issudan, setsudan,
//       ishb, sethb,
//       value, setValue,
//       trigr, setTrigr
//     }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// // Custom hook to use filter state in any component
// // export const useFilter = () => useContext(FilterContext);

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error('useFilter must be used within a FilterProvider');
//   }
//   return context;
// };
// context/FilterContext.tsx

import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

// FilterContext ka type define karna
interface FilterContextType {
  fav : boolean;
  setFav :Dispatch<SetStateAction<boolean>>;
  twop: boolean;
  setTwop: Dispatch<SetStateAction<boolean>>;
  fourp: boolean;
  setFourp: Dispatch<SetStateAction<boolean>>;
  sixp: boolean;
  setSixp: Dispatch<SetStateAction<boolean>>;
  ischeked: boolean;
  setischeked: Dispatch<SetStateAction<boolean>>;
  issuv: boolean;
  setsuv: Dispatch<SetStateAction<boolean>>;
  issudan: boolean;
  setsudan: Dispatch<SetStateAction<boolean>>;
  ishb: boolean;
  sethb: Dispatch<SetStateAction<boolean>>;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  trigr: boolean;
  setTrigr: Dispatch<SetStateAction<boolean>>;
}

// Default context values
const defaultFilterState: FilterContextType = {
  fav : true,
  setFav : () => {},
  twop: false,
  setTwop: () => {},
  fourp: false,
  setFourp: () => {},
  sixp: false,
  setSixp: () => {},
  ischeked: false,
  setischeked: () => {},
  issuv: false,
  setsuv: () => {},
  issudan: false,
  setsudan: () => {},
  ishb: false,
  sethb: () => {},
  value: 70,
  setValue: () => {},
  trigr: false,
  setTrigr: () => {},
};

// `FilterContext` ko export karna
export const FilterContext = createContext<FilterContextType>(defaultFilterState);

// `FilterProvider` ko export karna, jo context provide karega
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  // State aur setters ko define karna
  const [fav, setFav] = useState(true);
  const [twop, setTwop] = useState(false);
  const [fourp, setFourp] = useState(false);
  const [sixp, setSixp] = useState(false);
 const [ischeked, setischeked] = useState(true);
  const [issuv, setsuv] = useState(false);
  const [issudan, setsudan] = useState(false);
  const [ishb, sethb] = useState(false);
  const [value, setValue] = useState(70);
  const [trigr, setTrigr] = useState(false);

  return (
    <FilterContext.Provider value={{
      fav , setFav,
      twop, setTwop,
      fourp, setFourp,
      sixp, setSixp,
      ischeked, setischeked,
      issuv, setsuv,
      issudan, setsudan,
      ishb, sethb,
      value, setValue,
      trigr, setTrigr
    }}>
      {children}
    </FilterContext.Provider>
  );
};
