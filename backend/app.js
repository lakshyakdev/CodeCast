import express from "express";
const app = express();

import cookieParser from "cookie-parser";


app.use(express.json());
app.use(cookieParser(process.env.Secret));

app.get("/",(req,res)=>{
    res.send("Server is working fine");
    console.log(process.env.CLOUD_API_KEY);
})

import userRouter from "./routes/user.js";
app.use("/api/v4/users",userRouter);


app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).json({
        success : false,
        message : message,
    })
})
export default app;