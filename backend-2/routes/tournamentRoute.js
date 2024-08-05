import express from "express"
import { addTournament, bookTournament, getavailableUsersforATournament, getregisteredTournement } from "../controllers/tournamentController.js";
import { authMiddleWare } from "../middleware/auth.js";
import multer from "multer";
/* Multer config */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const tournamentRouter = express.Router();


tournamentRouter.get("/getUsers",authMiddleWare,getavailableUsersforATournament)
tournamentRouter.post("/book",authMiddleWare,bookTournament)
tournamentRouter.get("/bookedTournament",authMiddleWare,getregisteredTournement)
tournamentRouter.post("/addTournament",authMiddleWare,upload.array('images',5),addTournament);

export default tournamentRouter