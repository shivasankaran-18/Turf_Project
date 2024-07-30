import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


const book = async (req,res)=>{
    console.log("card:",req.body.card)
    const userData = await prisma.user.findUnique({where:{id:req.headers.id}})
    if(!userData){
        return res.json({success:false,message:"Please login to book your turf"})
    }

    let id = parseInt(req.body.turfId);
    let slot = req.body.slot;
    let sports = req.body.sports;
    let date=req.body.date

    console.log(date)
    console.log(slot)
    
    const turf = await prisma.turf.findUnique({where:{id:id}})
    if(!turf){
        return res.json({success:false,message:"Turf Not Found"});
    }
    const turfSlot = await prisma.turfSlot.findMany({where:{turfId:id,available:true,date,slot}})

    if(!turfSlot)
    {
        return res.json({msg:"no slot available"})
    }
    if(req.body.card=="card"){
        console.log("HI")
        return res.json({success:true,message:"Slot is available"})
    }
    console.log(turfSlot)
    try{
        await prisma.$transaction(async(tx)=>{
       
            const data=await tx.userBooking.create({
                data:{
                    turfId:id,
                    userId:userData.id,
                    date ,
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
    console.log(user+"reacher *****")
    const turfs=await prisma.userBooking.findMany({
        where:{
            userId:user.id,
            paid:false
        }
    })

    console.log(turfs+"reacher *****")

    const details={}
    for(let i=0;i<turfs.length;i++)
    {
        let temp=await prisma.turf.findUnique({
            where:{
                id:turfs[i].turfId
            }
        })
        if(temp)
        {
            details[turfs[i].turfId]=temp.turfName
        }
    }

    let temp=turfs.reduce((acc,val)=>{
        let key=`${val.turfId}`
        if(!acc[key])
        {
            acc[key]={
                id:val.turfId,
            slots:[val.slot],
            price:[val.price],
            date:[val.date],
            turfName:details[val.turfId]
            }
            


        }
        else{
            acc[key].slots.push(val.slot)
            acc[key].price.push(val.price)
            acc[key].date.push(val.date)
            
        }
        return acc
    },{})

    console.log("booked "+Object.values(temp))

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
    console.log(result)

    return res.json({msg:"success",val:Object.values(temp)})

}

export {book,booked}
