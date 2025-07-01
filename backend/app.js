import express from "express";
const app = express();

import cookieParser from "cookie-parser";

import cors from "cors";

app.use(cors({
  origin: [ "http://localhost:5173","https://codecast-l16n.onrender.com",],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser(process.env.Secret));
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("Server is working fine");
    console.log(process.env.CLOUD_API_KEY);
})


import userRouter from "./routes/user.js";
app.use("/api/v4/users",userRouter);

import CourseRouter from "./routes/course.js"
app.use("/api/v4/courses",CourseRouter);

app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).json({
        success : false,
        message : message,
    })
})
export default app;