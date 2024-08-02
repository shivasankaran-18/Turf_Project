import { useState } from "react";
import { Button } from "../shadcn/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../shadcn/ui/card";
import { NavBar } from "../components/Navbar";

export function Tournaments() {
  const [showUpcoming, setShowUpcoming] = useState(false);
  const tournaments = [
    {
      id: 1,
      name: "Summer Turf Classic",
      date: "June 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Central Park, New York",
      description: "Join us for an exciting day of turf competition and camaraderie. Players of all skill levels are welcome.",
      imageUrl: "https://example.com/summer-turf-classic.jpg",
    },
    {
      id: 2,
      name: "Fall Turf Showdown",
      date: "October 5, 2024",
      time: "11:00 AM - 7:00 PM",
      location: "Griffith Park, Los Angeles",
      description: "Experience the thrill of the Fall Turf Showdown, where the best turf athletes come together to showcase their skills.",
      imageUrl: "https://example.com/fall-turf-showdown.jpg",
    },
    {
      id: 3,
      name: "Winter Turf Invitational",
      date: "January 20, 2025",
      time: "8:00 AM - 4:00 PM",
      location: "Millennium Park, Chicago",
      description: "Don't miss the Winter Turf Invitational, a must-attend event for any true turf enthusiast.",
      imageUrl: "https://example.com/winter-turf-invitational.jpg",
    },
    {
      id: 4,
      name: "Spring Turf Challenge",
      date: "April 12, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Golden Gate Park, San Francisco",
      description: "Get ready for the Spring Turf Challenge, where the top turf players from around the country will compete for the championship.",
      imageUrl: "https://example.com/spring-turf-challenge.jpg",
    },
  ];
  const filteredTournaments = showUpcoming
    ? tournaments.filter((tournament) => new Date(tournament.date) >= new Date())
    : tournaments;

  return (
    <div className="text-foreground min-h-screen ">
      <NavBar val="tournaments" />
      <header className="text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold">Tournaments</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6">
        <div className="flex justify-end mb-6">
          <Button
            variant={showUpcoming ? "outline" : "destructive"}
            onClick={() => setShowUpcoming(false)}
            className="mr-2"
          >
            All Tournaments
          </Button>
          <Button variant={showUpcoming ? "destructive" : "outline"} onClick={() => setShowUpcoming(true)}>
            Upcoming Tournaments
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => {
            const isUpcoming = new Date(tournament.date) >= new Date();
            return (
              <Card key={tournament.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={tournament.imageUrl} alt={tournament.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gray-600" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-gray-600" />
                      <span>{tournament.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-gray-600" />
                      <span>{tournament.location}</span>
                    </div>
                    <p className="text-gray-700">{tournament.description}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={isUpcoming} className="ml-auto">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function CalendarIcon(props: any) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon(props: any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
