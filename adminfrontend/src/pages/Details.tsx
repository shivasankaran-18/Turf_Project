import { useState, useEffect } from "react";
import { NavBar } from "../components/Navbar";
import { Button } from "../shadcn/ui/button";
import { Card } from "../shadcn/ui/card";
// import { Modal } from "../shadcn/ui/modal"; // Assuming you have a Modal component in ShadCN

export function Details() {
  const [turfDetails, setTurfDetails] = useState({
    name: "Acme Turf Field",
    area: "5,000 sq ft",
    city: "San Francisco",
    state: "California",
  });
  const [turfSlots, setTurfSlots] = useState([
    { date: "June 15, 2023", slots: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"] },
    // Add more slots as needed
  ]);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingSlot, setIsEditingSlot] = useState(false);
  const [slotToEdit, setSlotToEdit] = useState(null);
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTimes, setNewSlotTimes] = useState([""]);

  const handleEditDetails = () => {
    setIsEditingDetails(true);
  };

  const handleSaveDetails = () => {
    // Update the details in the backend
    setIsEditingDetails(false);
  };
  //@ts-ignore
  const handleEditSlot = (slot) => {
    setSlotToEdit(slot);
    setIsEditingSlot(true);
  };

  const handleSaveSlot = () => {
    // Update the slot in the backend
    setIsEditingSlot(false);
    setSlotToEdit(null);
  };

  const handleAddSlot = () => {
    const newSlot = {
      date: newSlotDate,
      slots: newSlotTimes.filter((time) => time.trim() !== ""),
    };
    setTurfSlots([...turfSlots, newSlot]);
    setNewSlotDate("");
    setNewSlotTimes([""]);
  };

  return (
    <>
      <NavBar val="home" />
      <div className="w-full mt-16">
        <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
          <img src="/placeholder.svg" alt="Turf Field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Acme Turf Field</h1>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Turf Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground">Turf Name</span>
                  <span className="font-medium">{turfDetails.name}</span>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground">Area</span>
                  <span className="font-medium">{turfDetails.area}</span>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground">City</span>
                  <span className="font-medium">{turfDetails.city}</span>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground">State</span>
                  <span className="font-medium">{turfDetails.state}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <Button size="lg" onClick={handleEditDetails}>Edit</Button>
            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Available Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {turfSlots.map((slot, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">{slot.date}</div>
                  <Button variant="outline" size="sm" onClick={() => handleEditSlot(slot)}>
                    Edit Slots
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {slot.slots.map((time, idx) => (
                    <div key={idx} className="grid gap-1">
                      <span className="text-sm text-muted-foreground">Slot {idx + 1}</span>
                      <span className="font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Add New Slot</h2>
            <input
              type="date"
              value={newSlotDate}
              onChange={(e) => setNewSlotDate(e.target.value)}
              className="border p-2 rounded mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              {newSlotTimes.map((time, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Slot ${idx + 1} Time`}
                  value={time}
                  onChange={(e) => {
                    const newTimes = [...newSlotTimes];
                    newTimes[idx] = e.target.value;
                    setNewSlotTimes(newTimes);
                  }}
                  className="border p-2 rounded"
                />
              ))}
            </div>
            <Button size={"lg"}onClick={() => setNewSlotTimes([...newSlotTimes, ""])}>Add Slot</Button>
            <Button className="m-4"  size={"lg"} onClick={handleAddSlot}>
              Save Slot
            </Button>
          </div>
        </section>
      </div>

      {/* {isEditingDetails && (
        <Modal title="Edit Turf Details" onClose={() => setIsEditingDetails(false)}>
          <div className="space-y-4">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Turf Name</span>
              <input
                type="text"
                value={turfDetails.name}
                onChange={(e) => setTurfDetails({ ...turfDetails, name: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Area</span>
              <input
                type="text"
                value={turfDetails.area}
                onChange={(e) => setTurfDetails({ ...turfDetails, area: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">City</span>
              <input
                type="text"
                value={turfDetails.city}
                onChange={(e) => setTurfDetails({ ...turfDetails, city: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">State</span>
              <input
                type="text"
                value={turfDetails.state}
                onChange={(e) => setTurfDetails({ ...turfDetails, state: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <Button onClick={handleSaveDetails}>Save</Button>
          </div>
        </Modal>
      )} */}

      {/* {isEditingSlot && slotToEdit && (
        <Modal title="Edit Turf Slot" onClose={() => setIsEditingSlot(false)}>
          <div className="space-y-4">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Date</span>
              <input
                type="text"
                value={slotToEdit.date}
                onChange={(e) => setSlotToEdit({ ...slotToEdit, date: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Slots</span>
              {slotToEdit.slots.map((time, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={time}
                  onChange={(e) => {
                    const newTimes = [...slotToEdit.slots];
                    newTimes[idx] = e.target.value;
                    setSlotToEdit({ ...slotToEdit, slots: newTimes });
                  }}
                  className="border p-2 rounded mb-2"
                />
              ))}
              <Button onClick={() => setSlotToEdit({ ...slotToEdit, slots: [...slotToEdit.slots, ""] })}>Add Slot</Button>
            </div>
            <Button onClick={handleSaveSlot}>Save</Button>
          </div>
        </Modal>
      )} */}
    </>
  );
}
