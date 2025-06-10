import express from "express";
const app = express();

import user from "./routes/user.js"
app.use("/api/v1/user",user);

import cookieParser from "cookie-parser";
cookieParser(process.env.Secret);

app.get("/",(req,res)=>{
    res.send("Server is working fine");
})

import userRouter from "./routes/user.js";
app.use("/api/v1/users",userRouter);


app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).json({
        success : false,
        message : message,
    })
})
export default app;