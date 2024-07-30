import { Dispatch, SetStateAction } from "react"
import { Button } from "../shadcn/ui/button"
import { Input } from "../shadcn/ui/input"


export const SearchBar=({setFilter}:any)=>{
    return(
        
<div className="relative top-10  left-4 flex items-center w-full mx-auto ">   
    
    <div className="relative w-5/6">
        
        <Input type="text"  className="bg-gray-50 border  śborder-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  " placeholder="Search " 
        onChange={(e)=>setFilter(e.target.value)}
        
        />
        
    </div>
        <Button  size="sm" className="ms-4 w-2/12 hover:bg-red-700">
        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Search
        </Button>
        
    
</div>

    )
}