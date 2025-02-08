



"use client"

import {
  ClerkProvider,
  
} from '@clerk/nextjs'

import Metadata from "@/app/metadata"
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import "./globals.css";
import localFont from "next/font/local";
import {FilterProvider} from "@/context/FilterContext"
import {CartProvider} from "@/context/CartContext"
interface LayoutProps {
  children: ReactNode;
}




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       ><Header/>
//       <div>

//       </div>
//         {children}
//       </body>
//     </html>
//   );
// }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Check if the current route is "/signup" or "/login"
  const isSignupOrLoginPage = pathname === '/studio' || pathname === '/Login';

  return (
    
    <html lang="en">
      <head>
        <Metadata />
      </head>
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {/* Conditionally render the header based on the route */}
      {!isSignupOrLoginPage && (
        <p></p>
        
      )}
      <ClerkProvider>
      <CartProvider>
      <FilterProvider>
      
      <Header/>
      {children}
      <Footer/>
      </FilterProvider>
      </CartProvider>
      
      
      
     </ClerkProvider> 
      </body>
    </html>
  );
};

export default Layout;