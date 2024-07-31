import express from "express"
import { addLike, addTurf,getTurfSlot, listTurf } from "../controllers/turfController.js"
import { PrismaClient } from "@prisma/client";
import { authMiddleWare } from "../middleware/auth.js";
const prisma=new PrismaClient();
const turfRouter = express.Router();

/* Image Storage */





turfRouter.post("/add",authMiddleWare,addTurf);
turfRouter.get("/getslot",authMiddleWare,getTurfSlot);
turfRouter.get("/list",authMiddleWare,listTurf)
turfRouter.post("/addlikes",authMiddleWare,addLike)

turfRouter.get("/update",async(req,res)=>{
    const result=await prisma.turfSlot.create({
        data:{
            turfId:1,
            date:"2024-07-14",
            timeSlots:"18:00-19:00"
        }
    })
    return res.json(result)
})


export default turfRouter;