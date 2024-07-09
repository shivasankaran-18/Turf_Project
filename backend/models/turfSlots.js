import mongoose from "mongoose";


const slotTimingSchema = mongoose.Schema(
    {
        turfId : {type:Number,required:true},
        date : {type:Array(Date),default:[]},
        timeSlots : {type:Array(String),default:[]}
    }
)

const slotTimingModel = mongoose.models.slots || mongoose.model("slots",slotTimingSchema)


export default slotTimingModel;