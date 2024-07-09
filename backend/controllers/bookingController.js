import bookingModel from "../models/userBooking.js";
import TurfModel from "../models/turfmodel.js";
import slotTimingModel from "../models/turfSlots.js";
import userModel from "../models/usermodel.js";

const book = async (req,res)=>{
    const userData = await userModel.findOne({_id:req.body.userId});
    if(!userData){
        return res.json({success:false,message:"Please login to book your turf"})
    }
    let id = req.body.turfId;
    let start = req.body.startTime;
    let date1 = req.body.date;
    let end = req.body.endTime;
    let time = start+"-"+end
    const turf = await TurfModel.findOne({turfId:id});
    if(!turf){
        return res.json({success:false,message:"Turf Not Found"});
    }
    const turfSlot = await slotTimingModel.findOne({turfId:id});
    let dateArr = [];
    turfSlot.date.some(x => dateArr.push(x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate()));
    console.log(dateArr)
    console.log(date1)
    const isdate = dateArr.indexOf(date1);
    const isTime = turfSlot.timeSlots.indexOf(time);
    if(isdate == -1){
        return res.json({success:false,message:"The Date is not available"});
    }
    if(isTime == -1){
        return res.json({success:false,message:"The slot is already booked or the slot is not there"})
    }
    let turfBooked = {
        "turfName":turf.turfname,
        "address":turf.address,
        "city":turf.city,
        "state":turf.state,
        "date": date1,
        "startTime": start,
        "endTime": end
    }
    console.log(userData);
    userData.userBooking.push(turfBooked);
    userData.save();
    res.json({success:true,message:"Slot Booked"});
}

export {book}
