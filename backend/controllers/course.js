import mongoose from "mongoose"
import Course from "../models/course.js"
import ExpressError from "../utils/ExpressError.js";

const viewAllCourses = async (req,res,next)=>{
    try{
        let allCourses = await Course.find({});
        if (allCourses.length === 0) {
            return res.json({
                success: true,
                message: "No courses available currently.",
                allCourses: [],
            });
        }
        if(allCourses){
            return res.json({
                success : true,
                message : "All course fetched",
                allCourses,
            })
        }
        else{
            return next(new ExpressError(500, "Someting went wrong"));
        }
    }
    catch(e){
        return next(new ExpressError(500,e));
    }
}

const viewCourse =async (req,res,next)=>{
    let {id} = req.params;
    try{
        let course = await Course.findById(id);
        if(course){
            return res.json({
                success:true,
                message : "course fetched properly",
                course,
            })
        }
        else{
            return next(new ExpressError(400, `Course with id:${id} not present please recheck the id`));
        }
    }
    catch(e){
        return next(new ExpressError(400, `Course with id:${id} not present please recheck the id`));
    }
}

const createCourse = async (req,res,next)=>{
    let {title, description,accessLevel } = req.body;
    if(!title){
        return next(new ExpressError(400, "Title is required"));
    }
    if(!description){
        return next(new ExpressError(400, "description is required"));
    }
    if(!accessLevel){
        return next(new ExpressError(400, "accessLevel is required"));
    }
    let url = "https://res.cloudinary.com/dvy0dasmy/image/upload/v1749984318/CodeCast/zvrmr32kvwjizyyd0v7q.png";
    let publicId = "deafult thumbnail";

    if(req.file){
            url = req.file.path;
            publicId = req.file.filename;
    }
    let createdBy = req.user.id;
    if(req.user.role === "MODERATOR" || req.user.role === "ADMIN"){
        let course = await Course.create({
        title,
        description,
        accessLevel,
        createdBy,
        thumbnail : {
            url,
            publicId,
        }
        });
        if(!course){
            return next(new ExpressError(500, "Something went wrong while creating course"));
        }
        await course.save();

        return res.json({
            success : true,
            message: "Course created successfully",
            course,
        })
    }
    return next(new ExpressError(401, "Users are not allowed to create course"));
}

export{
    viewAllCourses,
    viewCourse,
    createCourse,
}