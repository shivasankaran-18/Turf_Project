import express from "express"
import { bookTournament, getavailableUsersforATournament, getregisteredTournement, listTournament } from "../controllers/tournamentController.js";
import { authMiddleWare } from "../middleware/auth.js";
import { addTournament } from "../controllers/adminController.js";
import multer from "multer";
/* Multer config */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const tournamentRouter = express.Router();


tournamentRouter.get("/getusers",authMiddleWare,getavailableUsersforATournament)
tournamentRouter.post("/book",authMiddleWare,bookTournament)
tournamentRouter.get("/bookedtournament",authMiddleWare,getregisteredTournement)
tournamentRouter.post("/addtournament",authMiddleWare,upload.array('images',5),addTournament);
tournamentRouter.get('/listtournament',authMiddleWare,listTournament)

export default tournamentRouter