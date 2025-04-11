import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {errorHandler} from "./middlewares/errorHandler.middleware.js"

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app=express()

app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true
}));

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import vehicleRouter from "./routes/vehicle.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/vehicles",vehicleRouter)

app.use(errorHandler)

export default app;