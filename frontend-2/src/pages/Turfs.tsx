import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { NavBar } from "../components/Navbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SearchBar } from "../components/SearchBar";

type temp={
    id:string,
    turfname:string,
    address:string,
    city:string,
    state:string,
    images:"string",
    turfId:Number



}[]


export const Turfs=()=>{
    const [turfs,setTurfs]=useState<temp>([]);
    const [val,setval]=useState<boolean>(true);
    const [filter,setFilter]=useState<string>(" ");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/turfdetails/list`).then((data)=>{
            console.log(data)
            setTurfs(data.data)});
            setval(false);
        

    },[filter])
    if(val)
    {
        return (
            <>
            <NavBar val={"turfs"} />
            
            </>
            

        )
    }

    return(
        <>
        <NavBar val={"turfs"}/>
        <SearchBar setFilter={setFilter}/>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {turfs.map((turf)=><Card name={turf?.turfname} area={turf?.address} city={turf?.city} state={turf?.state} price={"800"}/>)}
            
     
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
        
        </div>
        
        </>
    )
}