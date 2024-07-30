import { SetStateAction, useEffect, useState } from "react"
import { NavBar } from "../components/Navbar"
import { Button } from "../shadcn/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../shadcn/ui/card"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Spinner } from "../components/Spinner"
import { Link, useNavigate } from "react-router-dom"
import { Label } from "../shadcn/ui/label"
import { Input } from "../shadcn/ui/input"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../shadcn/ui/dialog"




type detial={
  id?:number,
  Sports?:string[],
  adminId?:number,
  area:string,
  city:string,
  likes?:number,
  state:string,
  turfName:string,
  images?:string[]
}



export  function Home() {
  const [details,setDetails]=useState<detial>();
  const [flag,setFlag]=useState<boolean>(true)
  const [available,setAvailable]=useState<boolean>(true)
  const [isOpenCard,setIsOpenCard]=useState<boolean>(false)
  const  navigate=useNavigate()
  const [newTurf,setNewTurf]=useState<detial>({area:" ",city:" ",state:" ",turfName:" "})
  const [images, setImages] = useState([]);

 
  useEffect(()=>{
  
    axios.get(`${BACKEND_URL}/api/admin/getTurf`,{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    }).then((data)=>{
      // console.log(data.data)
      if(data.data.success=="false")
      {
        console.log(data.data+"*****")
        setAvailable(false)
        setFlag(false)
      }
      else{
        setDetails(data.data.turf)
        setFlag(false)
      }
      
     
    })
  
  
  },[])
  

  const handleFileChange = (e: { target: { files: SetStateAction<never[]> } }) => {
    if(e.target.files)
    {
      //@ts-ignore
      setImages(Array.from(e.target.files));
    }

  };

  const addTurf = async () => {
    const formData = new FormData();
    formData.append('turfName', newTurf.turfName);
    formData.append('area', newTurf.area);
    formData.append('city', newTurf.city);
    formData.append('state', newTurf.state);
   

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    console.log(formData)

    const res = await axios.post(`${BACKEND_URL}/api/admin/addTurf`, formData, {
      headers: {
        Authorization: localStorage.getItem('admintoken'),
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.data.success) {
      window.location.reload();
    } else {
      console.error('Failed to add turf');
    }
  };


 



  if(flag)
  {
    return(
      <div className='flex justify-center items-center h-screen'>
     
      <Spinner />
      
      
      </div>
  )

  }

  if(!available)
  {
    return(
      <div className="flex min-h-screen w-full flex-col bg-background">
        <NavBar val='home'/>
        <div className="flex justify-center items-center h-screen">
                    
        <div className="flex flex-col items-center justify-center space-y-4">
              <ClipboardIcon className="h-16 w-16 text-muted" />
              <h2 className="text-2xl font-bold">No Turfs Found</h2>
              <p className="text-muted-foreground">
                You don't have any turfs yet. Click the "Add Turf" button to get started.
              </p>
             <Button size={"lg"} className="bg-green-600 hover:bg-green-800" onClick={()=>setIsOpenCard(true)}>
          
               Add Turf

             </Button>
                
            
            </div>
        </div>
        <Dialog open={isOpenCard} >
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Turf</DialogTitle>
            </DialogHeader>
            <div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="turfName">Turf Name</Label>
                  <Input
                    id="turfName"
                    name="name"
                    value={newTurf.turfName}
                    onChange={(e: { target: { value: any } })=>setNewTurf({...newTurf,turfName:e.target.value})}
                    placeholder="Enter turf name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    name="area"
                    value={newTurf.area}
                    onChange={(e: { target: { value: any } })=>setNewTurf({...newTurf,area:e.target.value})}
                    placeholder="Enter area"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={newTurf.city}
                    onChange={(e: { target: { value: any } })=>setNewTurf({...newTurf,city:e.target.value})}
                    placeholder="Enter city"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={newTurf.state}
                    onChange={(e: { target: { value: any } })=>setNewTurf({...newTurf,state:e.target.value})}
                    placeholder="Enter state"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">Images</Label>
                  <Input
                    type="file"
                    multiple
                    //@ts-ignore
                    onChange={handleFileChange}
                  />
                </div>
               
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={()=>setIsOpenCard(false)}>
                Cancel
              </Button>
              <Button onClick={addTurf}>Add Turf</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <CardDescription className="text-muted-foreground">{`${details?.area},${details?.city},${details?.state}`}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5 text-red-500" />
                  <span className="text-lg font-bold">{details?.likes}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src={//@ts-ignore 
                  details?.images[0] || ""}
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
//@ts-ignore
function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}

//@ts-ignore
function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}



