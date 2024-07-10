import TurfModel from "../models/turfmodel.js";

import fs from "fs";

/* Add Turf Details */

const addTurf = async (req,res)=>{
    let image_filename = `${req.body.file}`
    console.log(req.body.state)
    const newTurf = new TurfModel(
        {
            turfname: req.body.turfname,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            images : image_filename
        }
    )

    try{
        await newTurf.save();
        res.json({sucess:true, message : "Turf Added"})
    }
    catch(error){
        console.log(error);
        res.json({sucess:false,message:"Failed to add Truf"})
    }
}
const getTurf=async(req,res)=>{
    const params=req.query.id;
    try{
        const turf=await TurfModel.findOne({
            turfId:params
        })
        res.json(turf);
    }
    catch{
        res.json({
            msg:"turf not found"
        })
    }

}

const listTurf = async(req,res) =>{
 
    const params=req.query.filter;
    console.log(params);
    try{
        const turfs = await TurfModel.find({turfname:{
            $regex:`/${params}/`,
          
       
        }});
        res.json(turfs)
    }
    catch(err){
        console.log(err);
        res.json({success:false})
    }
}
export {addTurf,listTurf,getTurf}