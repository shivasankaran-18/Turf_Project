import mongoose from "mongoose";


const bookingSchema = mongoose.Schema(
    {
        turfId: { type: Number, required:true},
        date: {type:Date,default:Date.now()},
        startTime : {type:String,required:true},
        endTime : {type:String,required:true}
    }
)

const bookingModel = mongoose.models.booking || mongoose.model("booking",bookingSchema)

export default bookingModel