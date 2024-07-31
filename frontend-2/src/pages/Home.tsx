

import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../components/Navbar";
import { Carousel, Card } from "../shadcn/ui/apple-cards-carousel";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "../components/Spinner";
import { Button } from "../shadcn/ui/button";
import { useNavigate } from "react-router-dom";




type turf={
  adminId:number,
  Sports:string[]
  area:string,
  city:string,
  id:number,
  images:string[],
  likes:number,
  state:string,
  turfName:string

}
let temp=[{Sports:[""],adminId:5,area:"Ambattur",city:"thiruvallu",id:9,images:[""],likes:0,state:"Tamil Nadu",turfName:"Badminton world"}]




export function Home() {
//@ts-ignore
  const [turfs,setTurfs]=useState<turf>(temp)
  const [val,setVal]=useState<boolean>()
  const navigate=useNavigate()


  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/turfdetails/list?filter=${" "}`,{
      headers:{
          Authorization:localStorage.getItem("usertoken")
      }

  }).then((data)=>{
 
      setTurfs(data.data)});
      setVal(false);
  },[])

  const cards=useMemo(()=>{
    //@ts-ignore
 
    return turfs.map((turf,idx)=>{
        console.log(turf)
      return <Card key={idx} card={turf} index={idx} />


    })
  },[turfs,val])


  if(val)
  {
    return(
      <div className='flex justify-center items-center h-screen'>
     
      <Spinner />
      
      
      </div>
  )

  }



  return (
    <>
    <NavBar val="home"></NavBar>
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-gray-100 dark:text-neutral-200 font-sans">
        Trending Turfs
      </h2>
      <Carousel items={cards} />
      <Button size="lg" onClick={()=>navigate("/turfs")}>View All Turfs</Button>
    </div>
    </>
  );
}



