import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shadcn/ui/input";

import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Meteors } from "../shadcn/ui/meteors";
import { AnimeatedButton } from "../components/buttonss";
import { StarsBackground } from "../shadcn/ui/stars-background";
import ShootingStars from "../shadcn/ui/shooting-stars";

export function Signup(){
    const [email,setEmail]=useState<string>(" ");
    const [passwd,setPasswd]=useState<string>(" ");
    const [name,setName]=useState<string>(" ");

    const navigate=useNavigate();

    return(

        
        // <div className=" bg-gray-900 flex items-center justify-center w-screen absolute left-0 top-0 h-screen">
        <div className=" rounded-md bg-neutral-900 flex flex-col items-center justify-center w-screen absolute left-0 top-0 h-screen"> 
        <div className=" w-1/3 relative ">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.90] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            
   
            <h1 className="font-bold text-xl text-white mb-4 relative z-50 text-center w-full" >
              TURFHUB
                    </h1>
                    <br></br>
                    
                    
            <h2 className="font-bold text-lg text-white  w-full text-center"> CREATE AN ACCOUNT</h2>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">

                     <div className="grid w-full max-w-sm items-center ">
                     <label htmlFor="email" className=" flex justify-start">Email</label>
                         <Input type="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                     </div>
                    
                     <div className="grid w-full max-w-sm items-center pt-5  ">
                        <label  className=" flex justify-start">Password</label>
                         <Input type="password" id="email" placeholder="Password" onChange={(e)=>setPasswd(e.target.value)}/>
                     </div>
                     <div className="grid w-full max-w-sm items-center  py-5  ">
                         <label className=" flex justify-start">Name</label>
                         <Input type="text" id="email" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <br></br>

                            <AnimeatedButton val={"Signup"} onClicked={async()=>{
                         try{
                             const res=await axios.post(`${BACKEND_URL}/api/user/register`,{
                                email,
                                password:passwd,
                                name
                            }) as any;
                            if(res.data.success==false)
                            {
                                alert("error")
                            }
                            else{
                                console.log(res.data.token)
                            //@ts-ignore
                            localStorage.setItem("usertoken",res.data.token);
                            console.log(res);
                            navigate("/home");

                            }
                            

                        }
                        catch{
                            window.alert("error");
                        }
                        
                            }}>Sign Up</AnimeatedButton>
                            <p className="mt-2  text-sm leading-5 text-white max-w">
                     {"Have an Account? "}
                     <Link to={"/signin"}
                         className="font-medium text-blue-500 hover:text-blue-500 ">
                         {" Sign in"}
                    </Link>
                 </p>

                    
            

                 </div>
            </div>

                    
            <Meteors number={20} />
        </div>
            </div>
          
    </div>

    )

}