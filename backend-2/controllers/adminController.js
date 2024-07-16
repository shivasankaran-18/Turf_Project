import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();



const addTimeSlot = async(req,res)=>{
    try{
        const TurfId = await prisma.turf.findUnique({
            where:{
                adminId: req.headers.id
            }
        })
        console.log("TurfId:"+TurfId);
        const turfSlots=await prisma.turfSlot.create({
            data:{
                turfId:TurfId.id,
                start:req.body.start,
                end:req.body.end,
                available:true,
                price:req.body.price
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