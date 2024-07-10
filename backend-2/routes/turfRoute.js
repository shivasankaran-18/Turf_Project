import express from "express"
import { addTurf, getTurf, listTurf } from "../controllers/turfController.js"


const turfRouter = express.Router();

/* Image Storage */





turfRouter.post("/add",addTurf)
turfRouter.get("/get",getTurf);
turfRouter.get("/list",listTurf)


export default turfRouter;