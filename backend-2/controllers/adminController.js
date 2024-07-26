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

const getTurf = async (req, res) => {
    const params = req.query.filter;
    console.log("Params:", params);
    
    try {
        const turf = await prisma.turf.findUnique({
            where: {
                adminId: req.headers.id,
            },
        });
        console.log(turf)
        if(!turf){
            return res.json({success:"false",message:"No turf is there"})
        }
        const turfSlots = await prisma.turfSlot.findMany({
            where: {
                turfId: turf.id,
                date: {
                    gt: params,
                },
            },
        });
        const groupedSlots = turfSlots.reduce((acc, slot) => {
            const key = `${slot.date}_${slot.turfId}`;
            if (!acc[key]) {
                acc[key] = {
                    id: [slot.id],
                    date: slot.date,
                    slot: [slot.slot],
                    price:[slot.price], 
                   
                    turfId: slot.turfId,
                };
            } else {
                acc[key].slot.push(slot.slot);
                acc[key].price.push(slot.price)
                acc[key].id.push(slot.id)

            }
            return acc;
        }, {});

        
        console.log(groupedSlots)
        const groupedSlotsArray = Object.values(groupedSlots);

        console.log("Grouped Slots:", groupedSlotsArray);

        return res.json({ success: true, turf, turfSlots: groupedSlotsArray });
    } catch (error) {
        console.error("Error fetching turf slots:", error);
        return res.status(200).json({ success: false, error: "Internal Server Error" });
    }
};


const updateTurfDetails=async(req,res)=>{
    const body=req.body
    console.log(body.details)

    const data=await prisma.turf.update({
        where:{
            adminId:req.headers.id
        },
        data:{
            area:body.details.area,
            city:body.details.city,
            turfName:body.details.turfName,
            state:body.details.state
        }
    })

    return res.json({success:"true",data})

}
const updateTurfSlots = async (req, res) => {
    const { slot } = req.body;
    console.log(slot)
  
    try {
    
         
          
          slot.id.map(async(id,idx)=>{
            console.log(id+" "+idx)
            const turfSlot=await prisma.turfSlot.update({
                where:{
                    id:id
                },
                data:{
                    slot:slot.slot[idx],
                    price:slot.price[idx]
                }

            })
            console.log("updated******"+turfSlot)

          })
          
          
      
  
      return res.json({ success: true, message: "Slots updated successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: "Slots not updated" });
    }
  };

  const addTurfSlots=async(req,res)=>{
    const {slots}=req.body
    console.log(slots)
    try{
        slots.slot.map(async (slot,idx)=>{
            const temp=await prisma.turfSlot.create({
                data:{
                    date:slots.date,
                    turfId:slots.turfId,
                    slot:slot,
                    price:slots.price[idx]
    
                }
            })
            console.log(temp)
        })
        return res.json({success:"true"})

    }
    catch{
        return res.json({success:"false"})
    }
    
  }

  const getNotPaidDetails=async(req,res)=>{
    try{
        const turf=await prisma.turf.findUnique({
            where:{
                adminId:req.headers.id
            }
        })
    
        const booking=await prisma.userBooking.findMany({
            where:{
                turfId:turf.id,
                paid:false
            },
        })
    
        const users=await prisma.user.findMany({
            where:{
                id:booking.userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
           
        })

        return res.json({success:"true",booking,users})


    }
    catch{
        return res.json({success:"false"})
    }
    

  }

  const getPaidDetails=async(req,res)=>{
    try{
        const turf=await prisma.turf.findUnique({
            where:{
                adminId:req.headers.id
            }
        })
    
        const booking=await prisma.userBooking.findMany({
            where:{
                turfId:turf.id,
                paid:true
            },
        })
    
        const users=await prisma.user.findMany({
            where:{
                id:booking.userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
            
        })

        return res.json({success:"true",booking,users})


    }
    catch{
        return res.json({success:"false"})
    }
    

  }

export  {addTimeSlot,getTurf,updateTurfDetails,updateTurfSlots,addTurfSlots,getNotPaidDetails,getPaidDetails}