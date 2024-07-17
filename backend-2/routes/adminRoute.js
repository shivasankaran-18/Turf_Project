import express from "express";
import { addTimeSlot, addTurfSlots, getNotPaidDetails, getPaidDetails, getTurf,  updateTurfDetails, updateTurfSlots } from "../controllers/adminController.js";
import { admindetail, adminlogin, adminregister } from "../controllers/adminDetailsController.js";
import { authMiddleWare } from "../middleware/auth.js";
import { addTurf } from "../controllers/turfController.js";


const adminRouter = express.Router();


adminRouter.post("/addtime",authMiddleWare,addTimeSlot);
adminRouter.post("/register",adminregister);
adminRouter.post("/login",adminlogin);
adminRouter.get("/details",authMiddleWare,admindetail);
adminRouter.post("/addturf",authMiddleWare,addTurf)
adminRouter.get("/getTurf",authMiddleWare,getTurf)
adminRouter.post("/updateTurfDetails",authMiddleWare,updateTurfDetails)
adminRouter.post("/updateTurfSlots",authMiddleWare,updateTurfSlots)
adminRouter.post("/addTurfSlots",authMiddleWare,addTurfSlots)
adminRouter.get("/getNotPaidDetails",authMiddleWare,getNotPaidDetails)
adminRouter.get("/getPaidDetails",authMiddleWare,getPaidDetails)

export default adminRouter