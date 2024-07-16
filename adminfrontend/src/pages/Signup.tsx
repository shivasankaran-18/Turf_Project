import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signup(){
    const [email,setEmail]=useState<string>(" ");
    const [passwd,setPasswd]=useState<string>(" ");
    const [name,setName]=useState<string>(" ");
    const [contact,setContact]=useState<string>(" ");

    const navigate=useNavigate();

    return(

        <div className="bg-red-100 min-h-screen bg- flex flex-col justify-center py-12  px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Create a new account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                    {"Or "}
                    <Link to={"/signin"}
                        className="font-medium text-blue-500 hover:text-blue-500 ">
                        {"Already Have an Account"}
                    </Link>
                </p>
            </div>


            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    <div className="grid w-full max-w-sm items-center ">
                        <label htmlFor="email" className=" flex justify-start">email</label>
                        <Input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    
                    <div className="grid w-full max-w-sm items-center pt-5  ">
                        <label  className=" flex justify-start">Password</label>
                        <Input type="password" placeholder="Password" onChange={(e)=>setPasswd(e.target.value)}/>
                    </div>
                    <div className="grid w-full max-w-sm items-center  py-5  ">
                        <label className=" flex justify-start">Name</label>
                        <Input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="grid w-full max-w-sm items-center  pb-5  ">
                        <label className=" flex justify-start">Contact No</label>
                        <Input type="text"  placeholder="Name" onChange={(e)=>setContact(e.target.value)}/>
                    </div>

                    <Button onClick={async()=>{
                        try{
                            const res=await axios.post(`${BACKEND_URL}/api/admin/register`,{
                                email,
                                password:passwd,
                                name,
                                contact

                            }) as {success:boolean,token:string};
                            //@ts-ignore
                            localStorage.setItem("admintoken",res.data.token);
                            console.log(res);
                            navigate("/home")

                        }
                        catch{
                            window.alert("error");
                        }
                        
                    }}>Sign Up</Button>

                    
            

                </div>
            </div>
        </div>

    )

}