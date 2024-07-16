import { useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import {  useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../shadcn/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  
  DialogTrigger,
} from "../shadcn/ui/dialog"
import { Spinner } from "../components/Spinner";

type detail={
  date:string,
  slot:string,
  price:number,
  available:boolean,
  id:number,
  turfid:number

}[]


export const Book=()=>{
    const [search]=useSearchParams()
    const [flag,setFlag]=useState(false);
    const [details,setDetails]=useState<detail>([]);
    const [date,setDate]=useState<string>("");
    const [slot,setSlot]=useState<string>("")
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
      setIsOpen(true);
    };
  
    const closeDialog = () => {
      setIsOpen(false);
    };

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/turfdetails/get?id=${search.get("id")}`,{
          headers:{
            Authorization:localStorage.getItem("usertoken")
          }
        }).then((data)=>{
            console.log(data.data);
            setDetails(data.data);
            setFlag(true)
        });
    },[search])
    // console.log(search.get("id"));
    if(!flag)
    {
     return(
      <div className='flex justify-center items-center h-screen'>
       
      <Spinner />
      
      
      </div>
     )
    }
    return (
        <>
            <NavBar val="turfs" />
            <div className="max-w-4xl mx-auto mt-24 p-5 bg-white shadow-lg rounded-lg  border-4 border-violet-400 ">
        <img src="path/to/turf-image.jpg" alt="Turf Image" className="w-full h-64 object-cover rounded-lg" />
       
          <div className="mt-6 space-y-4">
            <label  className="block text-sm font-medium text-gray-700 ">Select Date</label>
            <input type="date" onChange={(e)=>{console.log(e.target.value);setDate(e.target.value)}} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mt-6">
            <label htmlFor="slot" className="block text-sm font-medium text-gray-700">Select Slot</label>
          
            <select id="slot" name="slot" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e)=>{
              console.log(e.target.value)
              setSlot(e.target.value)
            }}
            >
              <option>Click</option>
              {details.map((x)=><option>{x.slot}</option>)}
            </select>
          </div>
          <div>
           

           
          <div>
              <Button className=" mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={openDialog}>Book Now</Button>

              <Dialog open={isOpen} >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    Are You Sure?.
                  </DialogDescription>
                  <DialogFooter className="flex justify-between">
                  <Button onClick={closeDialog}>Close</Button>
                  <Button onClick={async()=>{
            
              const res=await axios.post(`${BACKEND_URL}/api/user/book`,{
                turfId:search.get("id"),
                slot,
                date


              },{
                headers:{
                  Authorization:localStorage.getItem("usertoken")
                }
              })


              if(res.data.success)
              {
                closeDialog()
              }
              else{
                alert("error")
              }

           }}>Confirm</Button>
                    
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          <Button className="mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={()=>{navigate("/turfs")}} >Back</Button>
        </div>
        
      </div>

    
        
        </>
        
    )
}