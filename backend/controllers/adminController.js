import slotTimingModel from "../models/turfSlots.js";
import bookingModel from "../models/userBooking.js";


const addTimeSlot = async(req,res)=>{
    const newTime = new slotTimingModel(
        {
            turfId:req.body.turfId,
            date:req.body.date,
            timeSlots : req.body.timeSlots
        }

    )
    try{
        await newTime.save();
        return res.json({success:true,message:"Time Slot added successfully"});
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Time Slot not added"});
    }
}

export  {addTimeSlot}