import mongoose from "mongoose";





export const connectDb = async () =>{
    await mongoose.connect('mongodb+srv://yashwanth_010906:Yashwanth010906@yashcluster.gpdvhsa.mongodb.net/?retryWrites=true&w=majority&appName=YashCluster')
    .then(()=>{
        console.log("Connected with MongoDB")
    })
    .catch((err)=>{
        console.log(`Error on connecting ${err}`)
    })
}