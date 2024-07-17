/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AREAym9KEgc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../shadcn/ui/button"

export function Landing() {
    const navigate=useNavigate()
  return (
    <div className="flex flex-col min-h-screen min-w-full w-screen absolute left-0 top-0">
      <header className="bg-background px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link  to="" className="flex items-center" >
          <BusIcon className="h-6 w-6" />
          <span className="sr-only">Turf Booking</span>
        </Link>
        <div className="flex items-center gap-4">
         <Button onClick={()=>navigate("/signin")} >SignIn</Button>
         <Button onClick={()=>navigate("/signup")}>SignUp</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full h-full flex items-center justify-center bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Effortlessly Manage Your Turf Bookings
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our admin platform empowers you to streamline your turf booking process, optimize your operations,
                    and gain valuable insights to grow your business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to=""
                    
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    
                  >
                    Get Started
                  </Link>
                  <Link to=""
                    
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Admin Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Powerful Admin Dashboard</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Gain complete control over your turf bookings with our intuitive admin dashboard. View real-time
                    data, manage bookings, and access advanced reporting tools.
                  </p>
                </div>
                <Link to=""
                  
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Seamless Booking Management</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our booking management tools make it easy to handle reservations, track availability, and
                    communicate with customers. Streamline your operations and focus on delivering an exceptional
                    experience.
                  </p>
                </div>
                <Link to=""
                  
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  
                >
                  Explore Features
                </Link>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Booking Management"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Reporting Tools"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Insightful Reporting Tools</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Gain valuable insights into your turf business with our comprehensive reporting tools. Track key
                    metrics, generate custom reports, and make data-driven decisions to optimize your operations.
                  </p>
                </div>
                <Link to=""
                  
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-xs text-muted-foreground">&copy; 2024 Turf Booking. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="" className="text-xs hover:underline underline-offset-4" >
              Terms of Service
            </Link>
            <Link to="" className="text-xs hover:underline underline-offset-4" >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

//@ts-ignore
function BusIcon(props) {
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
        <path d="M8 6v6" />
        <path d="M15 6v6" />
        <path d="M2 12h19.6" />
        <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
        <circle cx="7" cy="18" r="2" />
        <path d="M9 18h5" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    )
  }

