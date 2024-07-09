import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Button } from "../shadcn/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../shadcn/ui/carousel";

export function Home() {
    const navigate=useNavigate();
  return (
    <div>
      <NavBar val="home"/>
      <div className="h-screen">
        <div className="flex justify-center items-center mt-36"> 
        <Carousel className="bg-slate-100 w-11/12 ">
          <CarouselContent>
            <CarouselItem>
              <div className="h-96 bg-blue-500 flex justify-center items-center w-full">Slide 1</div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-96 bg-green-500 flex justify-center items-center w-full">Slide 2</div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-96 bg-yellow-500 flex justify-center items-center w-full">Slide 3</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        </div>
        <Button size="lg" onClick={()=>navigate("/turfs")}>View All Turfs</Button>
        
        
      </div>

    

    </div>
  );
}
