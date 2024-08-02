

import { useState } from "react"
import { Label } from "../shadcn/ui/label"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../shadcn/ui/card"

export  function TournamentDetail() {
  const [showUpcoming, setShowUpcoming] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [teamSize, ] = useState(3)
  const [teamMembers, setTeamMembers] = useState([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ])
  const [teamLeader, ] = useState("user@example.com")
  const tournaments = [
    {
      id: 1,
      name: "Summer Turf Classic",
      date: "June 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Central Park, New York",
      description:
        "Join us for an exciting day of turf competition and camaraderie. Players of all skill levels are welcome.",
      image: "/turf-image-1.jpg",
      area: "Central Park",
      city: "New York",
      state: "NY",
      slotsLeft: 20,
    },
    {
      id: 2,
      name: "Fall Turf Showdown",
      date: "October 5, 2024",
      time: "11:00 AM - 7:00 PM",
      location: "Griffith Park, Los Angeles",
      description:
        "Experience the thrill of the Fall Turf Showdown, where the best turf athletes come together to showcase their skills.",
      image: "/turf-image-2.jpg",
      area: "Griffith Park",
      city: "Los Angeles",
      state: "CA",
      slotsLeft: 15,
    },
    {
      id: 3,
      name: "Winter Turf Invitational",
      date: "January 20, 2025",
      time: "8:00 AM - 4:00 PM",
      location: "Millennium Park, Chicago",
      description: "Don't miss the Winter Turf Invitational, a must-attend event for any true turf enthusiast.",
      image: "/turf-image-3.jpg",
      area: "Millennium Park",
      city: "Chicago",
      state: "IL",
      slotsLeft: 10,
    },
    {
      id: 4,
      name: "Spring Turf Challenge",
      date: "April 12, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Golden Gate Park, San Francisco",
      description:
        "Get ready for the Spring Turf Challenge, where the top turf players from around the country will compete for the championship.",
      image: "/turf-image-4.jpg",
      area: "Golden Gate Park",
      city: "San Francisco",
      state: "CA",
      slotsLeft: 25,
    },
  ]
  const filteredTournaments = showUpcoming
    ? tournaments.filter((tournament) => new Date(tournament.date) >= new Date())
    : tournaments
  const handleRegister = (tournament:any) => {
    setSelectedTournament(tournament)
  }
  //@ts-ignore
  const handleTeamMemberChange = (index, name, email) => {
    const updatedTeamMembers = [...teamMembers]
    updatedTeamMembers[index].name = name
    updatedTeamMembers[index].email = email
    setTeamMembers(updatedTeamMembers)
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log("Team Size:", teamSize)
    console.log("Team Members:", teamMembers)
    console.log("Team Leader:", teamLeader)
  }
  if (selectedTournament) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">{//@ts-ignore
            selectedTournament.name}</h1>
          </div>
        </header>
        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src="/placeholder.svg"
                alt={//@ts-ignore
                    selectedTournament.name}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{//@ts-ignore
                  selectedTournament.name}</h2>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span>{//@ts-ignore
                    selectedTournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{//@ts-ignore
                    selectedTournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    <span>{//@ts-ignore
                    selectedTournament.time}</span>
                  </div>
                </div>
                <div>
                  <p>{//@ts-ignore
                  selectedTournament.description}</p>
                </div>
                <div>
                  <p>Slots Left: {//@ts-ignore
                  selectedTournament.slotsLeft}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="team-members">Team Members</Label>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        id={`team-member-${index}`}
                        placeholder={`Team Member ${index + 1} Name`}
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, e.target.value, member.email)}
                      />
                      <Input
                        id={`team-member-${index}-email`}
                        type="email"
                        placeholder={`Team Member ${index + 1} Email`}
                        value={member.email}
                        onChange={(e) => handleTeamMemberChange(index, member.name, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team-leader">Team Leader</Label>
                  <Input id="team-leader" type="email" placeholder="Team Leader Email" value={teamLeader} disabled />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Tournaments</h1>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex justify-end mb-6">
          <Button
            variant={showUpcoming ? "default" : "outline"}
            onClick={() => setShowUpcoming(false)}
            className="mr-2"
          >
            All Tournaments
          </Button>
          <Button variant={showUpcoming ? "outline" : "default"} onClick={() => setShowUpcoming(true)}>
            Upcoming Tournaments
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => {
            const isUpcoming = new Date(tournament.date) >= new Date()
            return (
              <Card key={tournament.id}>
                <CardHeader>
                  <CardTitle>{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5" />
                      <span>{tournament.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5" />
                      <span>{tournament.location}</span>
                    </div>
                    <p>{tournament.description}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleRegister(tournament)} className="ml-auto">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

//@ts-ignore

function CalendarIcon(props) {
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
  )
}

//@ts-ignore


function ClockIcon(props) {
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
  )
}

//@ts-ignore


function MapPinIcon(props) {
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
  )
}


