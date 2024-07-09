import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        name:{type:String , required: true},
        email : {type: String,required:true,unqiue:true},
        password : {type:String, required:true},
        userBooking : {type:Array(Object),default:{}}
    },{minimize : false}
)

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel