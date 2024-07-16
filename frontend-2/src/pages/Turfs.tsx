import { useEffect, useState } from "react"
import {  Cards } from "../components/Card"
import { NavBar } from "../components/Navbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";

type temp={
    id:number,
    turfName:string,
    area:string,
    city:string,
    state:string,
   



}[]


export const Turfs=()=>{
    const [turfs,setTurfs]=useState<temp>([]);
    const [val,setval]=useState<boolean>(true);
    const [filter,setFilter]=useState<string>(" ");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/turfdetails/list`,{
            headers:{
                Authorization:localStorage.getItem("usertoken")
            }

        }).then((data)=>{
            console.log(data)
            setTurfs(data.data)});
            setval(false);
        

    },[filter])
    if(val)
    {
        return (
            <div className='flex justify-center items-center h-screen'>
       
            <Spinner />
      
      
            </div>
            

        )
    }

    return(
        <>
        <NavBar val={"turfs"}/>
        <SearchBar setFilter={setFilter}/>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {turfs.map((turf)=><Cards turfName={turf?.turfName} area={turf?.area} city={turf?.city} state={turf?.state} price={"800"} id={turf?.id}/>)}
            
     
       
        
        </div>
        
        </>
    )
}