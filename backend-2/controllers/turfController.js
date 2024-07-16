import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const addTurf = async (req,res)=>{
    console.log(req.headers.email);
    const admin = await prisma.adminDetails.findUnique(
        {
            where:{emailId : req.headers.email}
        })
    console.log("admin"+admin)
    if(!admin){
        return res.json({success:false,message:"Please login as admin to add turf"});
    }
   try{
    const newTurf = await prisma.turf.create({
        data:{
            turfName:req.body.turfName,
            area:req.body.area,
            city:req.body.city,
            state:req.body.state,
            sports:req.body.sports,
            adminId:admin.id
        }
    })
        res.json({sucess:true, message : "Turf Added"})
    }
    catch(error){
        console.log(error);
        res.json({sucess:false,message:"Failed to add Truf"})
    }
}
const getTurf=async(req,res)=>{
    const params=req.query.id;
    console.log(params)
    const turf=await prisma.turfSlot.findMany({
        where:{
            turfId:parseInt(params)
        }

    })
    return res.json(turf);

}

const listTurf = async(req,res) =>{

    const turf=await prisma.turf.findMany({ })
    return res.json(turf);
}
export {addTurf,listTurf,getTurf}