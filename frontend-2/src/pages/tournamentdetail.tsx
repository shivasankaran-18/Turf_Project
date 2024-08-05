

import { useState } from "react"
import { Label } from "../shadcn/ui/label"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../shadcn/ui/card"
import { NavBar } from "../components/Navbar"

export  function TournamentDetail() {
 
  const [teamLeader, ] = useState("user@example.com")
  
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">{selectedTournament.name}</h1>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src="/placeholder.svg"
              alt={selectedTournament.name}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{selectedTournament.name}</h2>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{selectedTournament.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{selectedTournament.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>{selectedTournament.time}</span>
                </div>
              </div>
              <div>
                <p>{selectedTournament.description}</p>
              </div>
              <div>
                <p>Slots Left: {selectedTournament.slotsLeft}</p>
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
      </main> */}
    </div>
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


