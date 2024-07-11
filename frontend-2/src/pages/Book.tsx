import { NavBar } from "../components/Navbar";




export const Book=()=>{
    console.log("reached");
    return (
        <>
            <NavBar val="turfs" />
            <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <img src="path/to/turf-image.jpg" alt="Turf Image" className="w-full h-64 object-cover rounded-lg" />
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
            <input type="date" onChange={(e)=>console.log(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="slot" className="block text-sm font-medium text-gray-700">Select Slot</label>
            <select id="slot" name="slot" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Book Now
            </button>
          </div>
        </form>
      </div>
    
        
        </>
        
    )
}