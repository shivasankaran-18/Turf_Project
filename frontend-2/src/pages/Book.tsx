import { SetStateAction, useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { flushSync } from 'react-dom';

type detail = {
  date: string,
  slot: string,
  price: number,
  available: boolean,
  id: number,
  turfid: number,
}[];

type turfDetails = {
  turfName: string,
  images: string,
  area: string,
  state: string,
  city: string,
  sports: [],
};

export const Book = () => {
  const [search] = useSearchParams();
  const [flag, setFlag] = useState(false);
  const [details, setDetails] = useState<detail>([]);
  const [turfDetails, setTurfDetails] = useState<turfDetails>();
  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [availabitility, setAvailability] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const handleOptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Called");

    if (selectedOption === "cash" || selectedOption === "") {
      openDialog();
    } else {
      try {
        const check1 = await handlecheck(); // Await the asynchronous function handlecheck
        console.log("availabitility:", availabitility);

          const response = await axios.post(`${BACKEND_URL}/api/user/payment`, {
            turfName: turfDetails?.turfName,
            area: turfDetails?.area,
            state: turfDetails?.state,
            city: turfDetails?.city,
            date: date,
            slot: slot,
            mode: selectedOption
          }, {
            headers: {
              Authorization: localStorage.getItem("usertoken")
            }
          });

          console.log(response.data);
          window.location = response.data.url;
      } catch (error) {
        console.error("Error during the post request:", error);
      }
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handlecheck = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/book`, {
        turfId: search.get("id"),
        slot,
        date
      }, {
        headers: {
          Authorization: localStorage.getItem("usertoken")
        }
      });

      if (res.data.success === true) {
        console.log("HI");

      flushSync(() => {
      setAvailability(true);
});
       
        console.log("availbefore:", availabitility);
      
        closeDialog();

      } else {
        setAvailability(false);
        alert("error");
      }
    } catch (error) {
      console.error("Error during the booking request:", error);
      setAvailability(false);
    }
  };

  useEffect(() => {
    console.log(search.get("id"));
    axios.get(`${BACKEND_URL}/api/turfdetails/getslot?id=${search.get("id")}`, {
      headers: {
        Authorization: localStorage.getItem("usertoken"),
      }
    }).then((data) => {
      console.log(data.data);
      let x = data.data[0];
      let y = {
        images: x.images,
        turfName: x.turfName,
        area: x.area,
        city: x.city,
        state: x.state,
        sports: x.sports
      };
      setTurfDetails(y);
      console.log(turfDetails);
      setDetails(data.data);
      setFlag(true);
    });
  }, [search]);

  if (!flag) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }
    return (
        <>
            <NavBar val="turfs" />
            <div className="max-w-4xl mx-auto mt-24 p-5 bg-white shadow-lg rounded-lg  border-4 border-violet-400 ">
              <h1>{turfDetails?.turfName}</h1>
        <img src={turfDetails?.images[0]} alt="Turf Image" className="w-full h-64 object-cover rounded-lg" />
       
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
              <h1>Select an Option</h1>
                <div>
                  <label>
                    <input
                      type="radio"
                      key="option1"
                      value="cash"
                      checked={selectedOption === 'cash'}
                      onChange={handleOptionChange}
                      name="options"
                    />
                    Cash
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      key="option2"
                      value="card"
                      checked={selectedOption === 'card'}
                      onChange={handleOptionChange}
                      name="options"
                    />
                    Card
                  </label>
                </div>
            </div>
          <div>
           
          <div>
              <Button className=" mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={handleSubmit}>Book Now</Button>

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
                  <Button onClick={handlecheck}>Confirm</Button>
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