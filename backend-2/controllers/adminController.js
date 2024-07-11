import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();



const addTimeSlot = async(req,res)=>{
    
    try{
        const turfSlots=await prisma.turfSlot.create({
            data:{
                turfId:req.body.turfId,
                date:req.body.date,
                timeSlots:req.body.timeSlots
            }
        })
        return res.json({success:true,message:"Time Slot added successfully"});
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Time Slot not added"});
    }
}

export  {addTimeSlot}