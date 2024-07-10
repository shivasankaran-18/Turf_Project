import express from "express"

import { login,register } from "../controllers/usercontroller.js"
import { authMiddleWare } from "../middleware/auth.js"
import { book } from "../controllers/bookingController.js"
const userRouter = express.Router()


userRouter.post("/register",register)

userRouter.post("/login",login)
userRouter.post("/book",authMiddleWare,book)

export default userRouter