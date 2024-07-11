import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const addTurf = async (req,res)=>{
    
   try{
    const newTurf = await prisma.turf.create({
        data:{
            turfName:req.body.turfName,
            area:req.body.area,
            city:req.body.city,
            state:req.body.state

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
    
    const turf=await prisma.turfSlot.findMany({
        where:{
            turfId:params
        }

    })
    return res.json(turf);

}

const listTurf = async(req,res) =>{
 
    const params=req.query.filter ||" ";
    console.log("params "+params)
    const turf=await prisma.turf.findMany({
        where:{
            turfName:{
                contains:params
            }
        }

    })
    return res.json(turf);
}
export {addTurf,listTurf,getTurf}