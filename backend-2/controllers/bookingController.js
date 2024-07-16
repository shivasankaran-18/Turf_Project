import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


const book = async (req,res)=>{
    const userData = await prisma.user.findUnique({where:{id:req.headers.id}})
    if(!userData){
        return res.json({success:false,message:"Please login to book your turf"})
    }
    

    let id = parseInt(req.body.turfId);
    let date1 = req.body.date;
    let slot = req.body.slot
    
    
    const turf = await prisma.turf.findUnique({where:{id}})
    if(!turf){
        return res.json({success:false,message:"Turf Not Found"});
    }
    const turfSlot = await prisma.turfSlot.findMany({where:{turfId:id,available:true,date:date1,timeSlots:slot}})
   

    if(!turfSlot)
    {
        return res.json({msg:"no slot available"})
    }
    
    try{
        await prisma.$transaction(async(tx)=>{
       
            const data=await tx.userBooking.create({
                data:{
                    turfId:id,
                    userId:userData.id,
                    date :date1,
                    slot
                }
            })
            const data2=await tx.turfSlot.update({
                where:{
                   
                    id:turfSlot[0].id
                },
                data:{
                    available:false
                }
            })
    
    
            res.json({success:true,message:"Slot Booked",data});
    
    
        })

    }
    catch{
        res.json({success:false})
    }
   

    
    
    
}

const booked=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
            id:req.headers.id
        }
    })
    const turfs=await prisma.userBooking.findMany({
        where:{
            userId:user.id,
            paid:false
        }
    })
    const result=[]
    for(let i=0;i<turfs.length;i++)
    {
        const temp=await prisma.turf.findUnique({
            where:{
                id:turfs[i].turfId
            }
        })
        if(temp)
        {
            result.push(temp)
        }
    }

    return res.json({msg:"success",result})

}

export {book,booked}
