import mongoose from "mongoose";

const TurfSchema = new mongoose.Schema(
    {
        turfname:{ type : String , required:true },
        address : {type: String, required:true},
        city : {type : String, required:true},
        state : {type:String, required:true},
        images : {type:String, required:true},
    }
)

const TurfModel = mongoose.model("Turf-Details",TurfSchema)

export default TurfModel

