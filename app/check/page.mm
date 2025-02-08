"use client"
import Link from "next/link";
import { useState } from "react";
import { BiSolidHomeSmile, BiImageAdd } from "react-icons/bi";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Import for styling

export default function Signup() {
    // User data ka structure define karne ke liye interface
    interface User {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        re_password: string;
        profilePic: string | null;
    }

    // State setup
    const [user, setUser] = useState<User>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        re_password: "",
        profilePic: null,
    });

    const [client, setClient] = useState<User[]>([]);

    // Crop state setup
    const [crop, setCrop] = useState<Crop>({
        unit: "%",  // Pixel unit for precise crop area
        width: 50,  // Fixed width of the crop area
        height: 50, // Fixed height of the crop area
        x: 25,       // Initial x position of crop area
        y: 25,       // Initial y position of crop area
      });

    // Image state setup
    const [imageSrc, setImageSrc] = useState<string | null>(null); // Set to string or null
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null); // Set to string or null
   
    // Handle input changes
    const data = (input: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    };

    // Handle file upload for profile picture
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string); // Type the result as string
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle the completion of the cropping action
    const handleOnCropComplete = (crop: Crop) => {
        setCrop(crop);
    };

    // Handle crop change
    const handleOnCropChange = (crop: Crop) => {
        setCrop(crop);
    };

    // Handle the final image cropping
    const   handleImageCrop = (imageFile, pixelCrop, width, height) => {
        if (imageSrc) {
            const image = new Image();
            image.src = imageSrc;
    
            // امیج لوڈ ہونے کا انتظار کریں
            image.onload = () => {
                const canvas = document.createElement('canvas');
                
                canvas.width = crop.width;
                canvas.height = crop.height;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, width, height);

                // Create a circular clipping path
                ctx.beginPath();
                ctx.arc(
                  width / 2, // x-coordinate of the center of the circle
                  height / 2, // y-coordinate of the center of the circle
                  Math.min(width, height) / 2, // radius of the circle (half of the smaller dimension)
                  0, // start angle (in radians)
                  2 * Math.PI // end angle (in radians)
                );
                ctx.closePath();
                ctx.clip();
    
                // کراپ کرنے کے لیے امیج کو کینوس پر ڈرا کریں
                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    width,
                    height
                  );
                const base64Image = canvas.toDataURL('image/jpeg');
                setCroppedImageUrl(base64Image);
            };
    
            // اگر امیج لوڈ نہ ہو سکے
            image.onerror = () => {
                console.error('Image failed to load');
            };
        } else {
            console.error('Image source is missing');
        }
    };

    
      
      
    // const handleImageCrop = () => {
    //     if (imageSrc && crop.width && crop.height) {
    //       const image = new Image();
    //       image.src = imageSrc;
      
    //       image.onload = () => {
    //         const canvas = document.createElement("canvas");
    //         const ctx = canvas.getContext("2d");
      
    //         if (ctx) {
    //           // Set canvas dimensions to crop size
    //           canvas.width = crop.width;
    //           canvas.height = crop.height;
      
    //           // Calculate the scaling factor (zoom out the image)
    //           const scaleFactor = 0.2; // Reduce to 80% of the image's original size (zoom out)
      
    //           // Apply the scaling factor
    //           const scaledWidth = image.width * scaleFactor;
    //           const scaledHeight = image.height * scaleFactor;
      
    //           // Calculate the position to center the image inside the crop box
    //           const xPos = (canvas.width - scaledWidth) /2;
    //           const yPos = (canvas.height - scaledHeight)/2 ;
      
    //           // Draw the image onto the canvas with zoom out effect
    //           ctx.drawImage(
    //             image, 
    //             crop.x, // Starting x coordinate (crop area)
    //             crop.y, // Starting y coordinate (crop area)
    //             image.width, // Original image width
    //             image.height, // Original image height
    //             xPos, // Center the image horizontally
    //             yPos, // Center the image vertically
    //             scaledWidth, // Apply zoom-out scaling (width)
    //             scaledHeight // Apply zoom-out scaling (height)
    //           );
      
    //           // Set the cropped image URL for display
    //           setCroppedImageUrl(canvas.toDataURL("image/jpeg"));
    //         }
    //       };
    //     }
    //   };
      
      
      

    const signup = () => {
        // Password match validation
        if (user.password !== user.re_password) {
            alert("Passwords do not match!");
            return;
        }

        // Check if the email already exists in the client array
        const isEmailExist = client.some(
            (existingUser) => existingUser.email === user.email
        );
        if (isEmailExist) {
            alert("This email is already registered!");
            return;
        }

        // Create a new user and add it to the client array
        const newUser: User = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            re_password: user.re_password,
            profilePic: croppedImageUrl, // Add the cropped profile picture URL
        };

        setClient([...client, newUser]); // Update the client state with the new user
        localStorage.setItem("clients", JSON.stringify([...client, newUser])); // Save to localStorage

        // Reset user state after signup
        setUser({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            re_password: "",
            profilePic: null,
        });

        alert("Signup successful!");
    };

    return (
        <div className="flex-col justify-items-center ">
            <Link href="/" className="flex text-4xl font-serif ">
                <BiSolidHomeSmile />
                Running Shop
            </Link>

            <div className="m-20 rounded-md p-4 border-[1px] border-black w-[450px] h-[650px] ">
                <p className="text-4xl my-8 ">Create Account</p>
                <ul className="">
                    <div className="h-20">
                        <li className="text-xl">FirstName</li>
                        <input
                            placeholder="Enter your Firstname"
                            type="text"
                            name="firstname"
                            onChange={data}
                            required
                            value={user.firstname}
                            className="text-xl pl-4 w-full rounded-md border-[1px] border-black"
                        />
                    </div>
                    <div className="h-20">
                        <li className="text-xl">LastName</li>
                        <input
                            placeholder="Enter your Lastname"
                            type="text"
                            name="lastname"
                            onChange={data}
                            required
                            value={user.lastname}
                            className="text-xl pl-4 w-full rounded-md border-[1px] border-black"
                        />
                    </div>
                    <div className="h-20">
                        <li className="text-xl">Email or mobile no</li>
                        <input
                            placeholder="Email or mobile no."
                            type="email"
                            name="email"
                            onChange={data}
                            required
                            value={user.email}
                            className="text-xl pl-4 w-full rounded-md border-[1px] border-black"
                        />
                    </div>
                    <div className="h-20">
                        <li className="text-xl">Password</li>
                        <input
                            placeholder="Enter your Password"
                            type="password"
                            name="password"
                            onChange={data}
                            required
                            value={user.password}
                            className="text-xl pl-4 w-full rounded-md border-[1px] border-black"
                        />
                    </div>
                    <div className="h-20">
                        <li className="text-xl">Re-Password</li>
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            name="re_password"
                            onChange={data}
                            required
                            value={user.re_password}
                            className="text-xl pl-4 w-full rounded-md border-[1px] border-black mb-2"
                        />
                    </div>

                    {/* Profile Picture Upload with Custom Icon */}
                    <div className="h-20">
                        <li className="text-xl">Profile Picture</li>
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <BiImageAdd size={30} className="text-gray-600" />
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {imageSrc && (
                            <div style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}>
                                {imageSrc && (
                               <ReactCrop
                                 key={imageSrc} // Force re-render if the image changes
           // Ensure src is a string (using non-null assertion)
                                crop={crop} // Crop settings
                                     onChange={handleOnCropChange} // Handle crop change
                                    onComplete={handleOnCropComplete}
                                    aspect={1} // Handle crop complete
                                     className="" ><img src={imageSrc} /></ReactCrop>
                                    )}
                                <button
                                    onClick={handleImageCrop}
                                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
                                >
                                    Crop Image
                                </button>
                            </div>
                        )}
                        {croppedImageUrl && (
                            <div className="mt-4">
                                <img
                                    
                                   
                                    className="w-64 h-64 object-cover rounded-full"
                                    style={{ maxWidth: "100%", backgroundImage: `url(${croppedImageUrl})`, backgroundSize : "cover" }}
                                ></img>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        onClick={signup}
                        className="w-full bg-violet-700 text-center h-10 content-center rounded-md mt-2"
                    >
                        Continue
                    </button>
                </ul>
                <Link href="/Login" className="my-8 flex">
                    You have already an Account? <p className="text-blue-300 ml-2">{">"} Login</p>
                </Link>
            </div>
        </div>
    );
}
// "use client"
// import { BiSolidHomeSmile, BiImageAdd } from "react-icons/bi";
// import { useState , useRef } from "react"
// import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
// const defaultAspect = 5 / 5
// export default function imagecroper(){
//     const [imageSrc, setImageSrc] = useState<string | null>(null); 
//     const [crop , setcrop]= useState({aspect: 10/10})
//     const [img , setimg] = useState("")
   
//      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//          const file = e.target.files ? e.target.files[0] : null;
//          if (file) {
//              const reader = new FileReader();
//              reader.onloadend = () => {
//                  setImageSrc(reader.result as string); // Type the result as string
//              };
//              reader.readAsDataURL(file);
//          }

//     };
//     return(
//         <div>
//              <div className="h-20">
//                          <li className="text-xl">Profile Picture</li>
//                          <label htmlFor="file-upload" className="cursor-pointer">
//                              <BiImageAdd size={30} className="text-gray-600" />
//                          </label>
//                          <input
//                              type="file"
//                              id="file-upload"
//                              accept="image/*"
//                              onChange={handleFileChange}
//                              className="hidden"
//                          /></div>
         
//            <ReactCrop onImageloded={setimg} crop={crop}/>

//         </div>
//     )
    
    
// }

