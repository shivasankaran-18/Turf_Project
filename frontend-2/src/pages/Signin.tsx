import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shadcn/ui/input";

import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Meteors } from "../shadcn/ui/meteors";
import { AnimeatedButton } from "../components/buttonss";
import { StarsBackground } from "../shadcn/ui/stars-background";
import ShootingStars from "../shadcn/ui/shooting-stars";


export function Signin() {
    const [email, setEmail] = useState<string>(" ");
    const [passwd, setPasswd] = useState<string>(" ");
    const navigate = useNavigate();


    return (
       
        
        <div className=" rounded-md bg-neutral-900 flex flex-col items-center justify-center w-screen absolute left-0 top-0 h-screen"> 
            <div className=" w-1/3 relative">
            
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.90] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          
          <h1 className="font-bold text-xl text-white mb-4 relative z-50 w-full text-center">
            TURFHUB
          </h1><br></br>
                    
                    
          <h2 className="font-bold text-xl text-white  w-full text-center"> LOGIN</h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="grid w-full max-w-sm items-center gap-1.5">
                         <label htmlFor="email" className=" flex justify-start text-white">Email</label>
                         <Input type="text" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                     </div>
                    
                     <div className="grid w-full max-w-sm items-center gap-1.5 py-5  ">
                         <label htmlFor="email" className=" flex justify-start text-white">Password</label>
                         <Input type="text" id="email" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} />
                     </div>
<br></br>
            <AnimeatedButton className="" val={"Signin"} onClicked={async () => {
                         try {
                             const res = await axios.post(`${BACKEND_URL}/api/user/login`, {
                                 email,
                                 password: passwd

                             })
                             console.log(res.data.token);
                             if (!res.data.success) {
                                 alert("user not found")
                             }
                             else {
                                 localStorage.setItem("usertoken", res.data.token);
                                 console.log(localStorage.getItem("token"))
                          
                                 navigate("/home");
                             }
                             //@ts-ignore
                            
                         }
                         catch {
                            window.alert("error");
                        }

                }}>Sign In</AnimeatedButton>
               
                    <p className="mt-2 text-center text-sm leading-5 text-white max-w">
                    {"Don't have account ? "}
                 <Link to={"/signup"}
                      className="font-medium text-blue-500 hover:text-blue-500 ">
                       {" Sign-up"}
                   </Link>
                 </p>
 
          
              </div>
              </div>
          
                    <Meteors number={40} />
                   
        </div>
            </div>
         
    </div>
        

   )

}