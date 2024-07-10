import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


const book = async (req,res)=>{
    const userData = await prisma.user.findUnique({where:{id:req.body.userId}})
    if(!userData){
        return res.json({success:false,message:"Please login to book your turf"})
    }
    let id = req.body.turfId;
    let start = req.body.startTime;
    let date1 = req.body.date;
    let end = req.body.endTime;
    let time = start+"-"+end
    const turf = await prisma.turf.findUnique({where:{id}})
    if(!turf){
        return res.json({success:false,message:"Turf Not Found"});
    }
    const turfSlot = await prisma.turfSlot.findMany({where:{turfId:id}})
    let dateArr = [];
    for(let i=0;i<turfSlot.length;i++)
    {
        dateArr.push(turfSlot[i].date);
    }
    
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
    
    const data=await prisma.userBooking.create({
        data:{
            turfId:turf.id,
            userId:userData.id,
            date :date1,
            startTime:start,
            endTime:end,
        }
    })
    res.json({success:true,message:"Slot Booked",data});
}

export {book}
