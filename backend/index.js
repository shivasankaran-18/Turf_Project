import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js";
import turfRouter from "./routes/turfRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js"
import adminRouter from "./routes/adminRoute.js";

import bodyParser  from "body-parser";

/*App Config*/
const app = express();
const PORT = 4000;
/* Middleware */
// app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
/* DB connection */
connectDb();


/* API endpoints */
app.use("/api/admin",adminRouter)
app.use("/api/turfdetails",turfRouter)
app.use("/api/user",userRouter)

app.listen(PORT,()=>{
    console.log("Running.........")
});

app.get("/",(req,res)=>{
    res.send("Hello world from express");
})
