import express from "express";
import { addTimeSlot } from "../controllers/adminController.js";


const adminRouter = express.Router();


adminRouter.post("/addtime",addTimeSlot);

export default adminRouter