import express from "express"
import { addTurf, listTurf } from "../controllers/turfController.js"
import multer from "multer"

const turfRouter = express.Router();

/* Image Storage */

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({
    storage:storage
})

turfRouter.post("/add",upload.single("images"),addTurf)
turfRouter.get("/list/:filter",listTurf)


export default turfRouter;