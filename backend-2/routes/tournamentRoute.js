import express from "express"
import { bookTournament, getavailableUsersforATournament } from "../controllers/tournamentController.js";


const tournamentRouter = express.Router();


tournamentRouter.get("/getUsers",getavailableUsersforATournament)
tournamentRouter.get("/book",bookTournament)

export default tournamentRouter