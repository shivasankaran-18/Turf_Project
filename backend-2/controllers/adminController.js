import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();



const addTimeSlot = async(req,res)=>{
    const admin = await prisma.adminDetails.findUnique({
        where:{
            emailId:req.headers.email
        }
    })
    if(!admin){
        return res.json({success:true,message:"Login to add"});
    }
    try{
        console.log(admin)
        const TurfId = admin.turf[0].id;
        console.log("TurfId:"+TurfId);
        const turfSlots=await prisma.turfSlot.create({
            data:{
                turfId:TurfId,
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