// src/pages/Booked.jsx
import  { useEffect, useState } from 'react';
import { NavBar } from '../components/Navbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Spinner } from '../components/Spinner';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userDetails } from '../store/atom';

type temp={
    id:number,
    area:string,
    city:string,
    state:string
    turfName:string

}[]


export const Booked = () => {
  const [bookings,setBookings]=useState<temp>([]);
  const[flag,setFlag]=useState(true)
  const user=useRecoilValueLoadable(userDetails)

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/user/get`,{
        headers:{
            Authorization:localStorage.getItem("usertoken")
        }
    }).then((data)=>
    {
        setBookings(data.data.result);
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
    <>
    <NavBar val={"booked"} />
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">My Bookings</h1>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{user.contents.name}</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Reserved Bookings (Not Paid)</h3>
            <ul className="space-y-4">
              {bookings.map((x) => (
                <li key={x.id} className="bg-gray-50 p-6 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-gray-100">
                  <h4 className="text-lg font-bold text-gray-800">{x.turfName}</h4>
                  <p className="text-gray-600">{`${x.city},${x.area},${x.state}`}</p>
                  <p className="text-gray-800 font-semibold">500/-</p>
                </li>
              ))}
            </ul>
          </div>
          
         
        </div>
      </div>
    </div>
    </>
  );
};

export default Booked;
