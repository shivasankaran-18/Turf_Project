

import { useEffect, useState } from "react"
import { NavBar } from "../components/Navbar"
import { Button } from "../shadcn/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../shadcn/ui/card"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Spinner } from "../components/Spinner"
import { useNavigate } from "react-router-dom"



type detial={
  id:number,
  Sports:string[],
  adminId:number,
  area:string,
  city:string,
  likes:number,
  state:string,
  turfName:string
}

export  function Home() {
  const [details,setDetails]=useState<detial>();
  const [flag,setFlag]=useState<boolean>(true)
  const  navigate=useNavigate()

 
  useEffect(()=>{
  
    axios.get(`${BACKEND_URL}/api/admin/getTurf`,{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    }).then((data)=>{
      console.log(data.data)
      setDetails(data.data.turf)
      setFlag(false)
    })
  
  
  },[])

  if(flag)
  {
    return(
      <div className='flex justify-center items-center h-screen'>
     
      <Spinner />
      
      
      </div>
  )

  }

  
   

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
        <NavBar val="home" />
     
      <main className="flex-1 px-4 py-8 sm:px-6 mt-16">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-6">
              <div className="flex items-center justify-between">
                <div className="grid gap-1">
                  <CardTitle className="text-2xl font-bold">{details?.turfName}</CardTitle>
                  <CardDescription className="text-muted-foreground">{`${details?.area.toUpperCase()},${details?.city.toUpperCase()},${details?.state.toUpperCase()}`}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5 text-red-500" />
                  <span className="text-lg font-bold">{details?.likes}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/placeholder.svg"
                width={600}
                height={300}
                alt="Turf Field"
                className="aspect-[2/1] w-full object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={()=>navigate("/details")}>View Details </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
//@ts-ignore
function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

//@ts-ignore
function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

//@ts-ignore
function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

//@ts-ignore
function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}


