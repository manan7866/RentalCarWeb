// import React, { useEffect, useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import Image from "next/image"; // Ensure you import Image if using Next.js for images
// import Visa from "@/public/images/Visa.svg";
// import Paypal from "@/public/images/PayPal.svg";
// import Bitcoin from "@/public/images/Bitcoin.svg";

// const CheckoutPage = ({ amount }: { amount: number }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [amount]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error: submitError } = await elements.submit();

//     if (submitError) {
//       setErrorMessage(submitError.message);
//       setLoading(false);
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
//       },
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     }

//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return (
//       <div className="flex items-center justify-center">
//         <div
//           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
//           role="status"
//         >
//           <span className="!absolute !-m-px !-h-px !-w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="px-6 py-8 bg-white rounded-xl">
//       <div className="flex justify-between xs:items-center my-6">
//         <div>
//           <p className="text-3xl xs:text-xl sm:text-2xl font-bold">Payment Method</p>
//           <p className="text-slate-400 xs:text-xs w-36 sm:text-xs text-lg">Please enter your payment method</p>
//         </div>
//         <div className="flex sm:mt-2 items-end">
//           <p className="text-slate-400 xs:text-sm mt-3 sm:text-[16px] text-xl">Step 3 of 4</p>
//         </div>
//       </div>

//       <div className="px-6 py-8 rounded-xl bg-[#F6F7F9]">
//         <div className="flex justify-between">
//           <div className="flex my-6 items-center">
//             <input type="radio" name="paymentMethod" className="h-5 w-5 mr-2" />
//             <p className="font-bold xs:text-lg sm:text-lg text-xl">Credit Card</p>
//           </div>
//           <Image src={Visa} className="sm:w-16 xs:w-12" alt="Visa" />
//         </div>

//         {/* Payment Form (Card Details) */}
//         <div className="grid grid-cols-2 xs:flex xs:grid-cols-none sm:flex sm:grid-cols-none md:flex md:grid-cols-none lg:flex lg:grid-cols-none flex-col gap-x-10 grid-rows-2">
//           <div className="my-4">
//             <label className="text-2xl my-2 xs:text-lg sm:text-lg block">Card Number</label>
//             <input className="px-6 py-5 w-full xs:py-3 rounded-xl bg-white" typeof="text" placeholder="Card Number" />
//           </div>
//           <div className="my-4">
//             <label className="text-2xl my-2 xs:text-lg sm:text-lg block">Expiry Date</label>
//             <input className="px-6 py-5 xs:py-3 w-full rounded-xl bg-white" type="date" />
//           </div>
//           <div className="my-4">
//             <label className="text-2xl my-2 xs:text-lg sm:text-lg block">Cardholder</label>
//             <input className="px-6 py-5 xs:py-3 w-full rounded-xl bg-white" typeof="text" placeholder="Cardholder" />
//           </div>
//           <div className="my-4">
//             <label className="text-2xl my-2 xs:text-lg sm:text-lg block">CVC</label>
//             <input className="px-6 py-5 xs:py-3 w-full rounded-xl bg-white" typeof="text" placeholder="CVC" />
//           </div>
//         </div>
//       </div>

//       {/* Other Payment Methods */}
//       <div className="flex bg-[#F6F7F9] my-8 rounded-xl px-6 justify-between">
//         <div className="flex my-6 items-center">
//           <input type="radio" name="paymentMethod" className="h-5 w-5 mr-2" />
//           <p className="font-bold xs:text-lg sm:text-lg text-xl">PayPal</p>
//         </div>
//         <Image src={Paypal} className="sm:w-16 xs:w-12" alt="PayPal" />
//       </div>

//       <div className="flex bg-[#F6F7F9] my-8 rounded-xl px-6 justify-between">
//         <div className="flex my-6 items-center">
//           <input type="radio" name="paymentMethod" className="h-5 w-5 mr-2" />
//           <p className="font-bold xs:text-lg sm:text-lg text-xl">Bitcoin</p>
//         </div>
//         <Image src={Bitcoin} className="sm:w-16 xs:w-12" alt="Bitcoin" />
//       </div>

//       {/* Stripe Payment Element */}
//       {clientSecret && <PaymentElement />}

//       {errorMessage && <div>{errorMessage}</div>}

//       <button
//         disabled={!stripe || loading}
//         className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
//       >
//         {!loading ? `Pay $${amount}` : "Processing..."}
//       </button>
//     </form>
//   );
// };

// export default CheckoutPage;
// "use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useLocation } from "react-router-dom";
interface CheckoutPageProps {
  amount: number;
  paySub: boolean;
  onCarsell: () => Promise<void>; // Expecting a Promise returning async function
}

const CheckoutPage : React.FC<CheckoutPageProps> = ({ amount  ,  onCarsell }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paySub , setPaysub] = useState(false)
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);  // URL se query params get karenge
    const paymentStatus = params.get('status');  // 'status' parameter check kareinge

    if (paymentStatus === 'succeeded' && !paySub) {
      console.log("Payment successful!");
      
      // Car update logic ko yahan call karein
      onCarsell();
      setPaysub(true)  // Your car update function
    } else {
      console.log("Payment failed or canceled.");
    }
  }, [location, paySub ,onCarsell])

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async () => {
    // event.preventDefault();
    setLoading(true);
    

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error  } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?status=succeeded`,
      },
      
    });
     
    if (error) {
      setErrorMessage(error.message);
    } else {
      // Payment successful
  
        // Call car update function
    }

    setLoading(false);
    
  };


  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !-h-px !-w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

 

  return (
    <form onSubmit={handleSubmit} className=" bg-[#F6F7F9] rounded-xl">
      <div className="w-full px-6 py-8 bg-white rounded-xl">
      <div className="flex justify-between  xs:items-center  my-6">
        <div>
          <p className="text-3xl xs:text-xl sm:text-2xl font-bold">Payment Method</p>
          <p className="text-slate-400 xs:text-xs w-36 sm:text-xs text-lg">Please enter your payment method</p>
        </div>
        <div className="flex sm:mt-2 items-end">
          <p className="text-slate-400 xs:text-sm mt-3 sm:text-[16px] text-xl">Step 3 of 4</p>
        </div>
      </div>

      

      {/* Stripe Payment Element */}
      {clientSecret && <PaymentElement className="bg-white" />}

      {errorMessage && <div>{errorMessage}</div>}</div>
      <div className="px-6 py-8 xs:py-2 sm:py-2 xs:pb-6 sm:pb-6 my-10 bg-white rounded-xl  ">
        <div className="flex justify-between xs:items-center  my-6 ">
            <div>
                <p className="text-3xl sm:text-2xl xs:text-xl font-bold">Confirmation</p>
                <p className="text-slate-400 xs:hidden  xs:text-xs sm:text-xs md:text-sm md:mt-2 text-lg">We are getting to the end.just few <br className="hidden xs:block sm:block md:block"/> click and your rental is ready!</p>
                <p className="text-slate-400 w-36 content-center hidden xs:block xs:text-xs">We are getting to the end. last step</p>
            </div>
            <div className="flex items-end  sm:items-center md:items-center sm:mt-3 md:mt-3">
            <p className="text-slate-400 xs:text-sm xs:mt-3 sm:text-[16px]  text-xl">Step 4 of 4</p>
            </div>
            </div>
            <div className="flex flex-col w-full  gap-8">
            <div className="px-6 py-6 xs:px-4 flex xs:items-start sm:items-start md:items-start gap-4 items-center rounded-xl bg-[#F6F7F9]">
                <input id="A" className="h-[24px] xs:h-[14px] sm:h-[16px] w-[24px]" type="checkbox"></input>
                <label htmlFor="A" className="cursor-pointer text-lg sm:text-xs xs:leading-[17px] xs:text-[8px] md:text-sm">I agree with sending an Marketing and newsletter emails. No spam, promissed!</label>

            </div>
            <div className="px-6 py-6 xs:px-4  flex gap-4 xs:items-start sm:items-start md:items-start items-center rounded-xl bg-[#F6F7F9]">
                <input id="B" className="h-[24px] xs:h-[14px] sm:h-[16px]  w-[24px]" type="checkbox"></input>
                <label htmlFor="B" className="cursor-pointer text-lg sm:text-xs xs:leading-[17px] xs:text-[8px] md:text-sm">I agree with our terms and conditions and privacy policy.</label>

            </div>
            <div>
              
            <button disabled={!stripe || loading} className="bg-blue-600 rounded-xl text-white xs:text-sm sm:text-sm xs:px-4 sm:px-6 xs:py-3 py-4 px-8 text-xl">{!loading ? `Rent Now` : "Processing..."}</button>
       
            </div>
            <div>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0532 5.96044C24.1587 6.01156 23.2615 5.93978 22.3865 5.74711C21.3311 5.38571 20.344 4.84934 19.4665 4.16044C18.7158 3.62829 18.003 3.04467 17.3332 2.41377C17.0492 2.14852 16.6751 2.00098 16.2865 2.00098C15.8979 2.00098 15.5238 2.14852 15.2398 2.41377C14.5878 3.02472 13.9023 3.59894 13.1865 4.13377C12.3036 4.83173 11.3128 5.38115 10.2532 5.76044C9.25656 5.98562 8.23276 6.06645 7.21317 6.00044C6.37831 5.96587 5.54596 5.88575 4.71983 5.76044C4.51796 5.73051 4.31213 5.74155 4.11461 5.79288C3.91709 5.84421 3.73193 5.93479 3.57018 6.05922C3.40842 6.18365 3.27337 6.33938 3.1731 6.51712C3.07282 6.69486 3.00936 6.89098 2.9865 7.09377C2.91983 7.73377 2.7465 9.40044 2.6665 11.2538C2.55439 13.1055 2.67082 14.9639 3.01317 16.7871C3.97856 19.8077 5.7541 22.5056 8.1465 24.5871C10.0481 26.3808 12.11 27.9964 14.3065 29.4138C14.8951 29.8179 15.5924 30.0343 16.3065 30.0343C17.0206 30.0343 17.7178 29.8179 18.3065 29.4138C20.3865 27.9595 22.332 26.3218 24.1198 24.5204C26.3722 22.4237 28.0402 19.777 28.9598 16.8404" stroke="#1A202C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 14.6667L18.48 18.48C18.5037 18.5059 18.5326 18.5265 18.5647 18.5406C18.5968 18.5548 18.6316 18.5621 18.6667 18.5621C18.7018 18.5621 18.7365 18.5548 18.7686 18.5406C18.8007 18.5265 18.8296 18.5059 18.8533 18.48L29.3333 8" stroke="#3563E9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div className="flex flex-col sm:text-sm gap-3">
                <p className="text-lg xs:text-sm sm:text-sm font-bold">All your data are safe</p>
                <p className="text-lg xs:text-sm sm:text-sm text-slate-400">We are using the most advanced security to provide you the best experience ever.</p>
            </div>
            </div>
        </div>
      
    </form>
  );
};

export default CheckoutPage;
