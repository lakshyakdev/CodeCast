import Course from "../models/course.js"
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.js";
import Lesson from "../models/lesson.js";

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

        return res.json({
            success : true,
            message: "Course created successfully",
            course,
        })
    }
    return next(new ExpressError(401, "Users are not allowed to create course"));
}

const editRoute =async (req,res,next)=>{
    try{
        let {id} = req.params;
        let course = await Course.findById(id);
        if(!course){
            return next (new ExpressError(400,"Incorrect course Id"));
        }
        if(!req.user || (course.createdBy != req.user.id && req.user.role != "ADMIN")){
            return next (new ExpressError(401,"You donot have authority to edit  this course"));
        }

        let { title, description, accessLevel  } = req.body;

        let url = course.thumbnail.url;
        let publicId = course.thumbnail.publicId;

        if(req.file){
                url = req.file.path;
                publicId = req.file.filename;
        }

        await Course.findByIdAndUpdate(id ,{
            title,
            description,
            accessLevel,
            thumbnail : {
                url,
                publicId,
            }
            }
        )
        return res.json({
            success:true,
            message:"Course updated successfully",
        });
    }
    catch(e){
        return next(new ExpressError(500,e));
    }
}

const deleteCourse = async (req,res,next)=>{
    try{
        let {id} = req.params;
        let course = await Course.findById(id);
        if(!course){
            return next (new ExpressError(400,"Incorrect course Id"));
        }
        if(!req.user || (course.createdBy != req.user.id && req.user.role != "ADMIN")){
            return next (new ExpressError(401,"You donot have authority to delete this course"));
        }
        await Course.findByIdAndDelete(id);
        return res.json({
            success:true,
            message:"Course deleted succesfully",
        })
    }
    catch(e){
        return next(new ExpressError(500,e));
    }
}

const enrollUser = async (req,res,next)=>{
    try{

        let {id} = req.params;
        let course = await Course.findById(id);
        if(!course){
            return next (new ExpressError(400,"Incorrect course Id"));
        }
        let user = await User.findById(req.user.id);
        if(user.role === "USER" ){
            let userPlan = user.subscriptions.plan;
            if(userPlan == course.accessLevel || userPlan == "PREMIUM" || course.accessLevel == "FREE"){
                if (course.enrolledUsers.includes(user._id)) {
                return next(new ExpressError(400, "Already enrolled in this course"));
                }
                course.enrolledUsers.push(user._id);
                user.enrolledCourses.push(course._id);
                await course.save();
                await user.save();
                return res.json({
                    success: true,
                    message: "Enrolled successfully",
                });
            }
            else{
                return next(new ExpressError(401, "Your subscription plan doesn't allow access to this course"));
            }
        }
        else {
          return next(new ExpressError(403, "Only USER role can enroll in courses"));
        }
    }
    catch(e){
        return next(new ExpressError(403, e));
    }
}

const viewLesson = async (req,res,next)=>{
    try{
        let {courseid,lessonid} = req.params;
        let course = await Course.findById(courseid).lean();
        if(!course){
            return next (new ExpressError(400,"Incorrect course Id"));
        }
        let userid = req.user.id;
        if(course.enrolledUsers.includes(userid)){
            let lesson = await Lesson.findById(lessonid).lean();
            if(!lesson){
                return next (new ExpressError(400,"Incorrect lesson Id"));
            }
            res.json({
                success:true,
                message:"Lesson successfully fetched",
                lesson,
            })
        }
        else{
            return next (new ExpressError(401,"User not enrolled in course"));
        }
    }
    catch(err){
        return next (new ExpressError(500,err));
    }
}

const createLesson = async (req,res,next)=>{
    try{

        let {courseid} = req.params;
        let course = await Course.findById(courseid);
        if(!course){
            return next (new ExpressError(400,"Incorrect course Id"));
        }
        if(req.user.role === "USER" || (req.user.role!="ADMIN" && req.user.id!=course.createdBy)){
            return next(new ExpressError(401, "Your role doesn't allow to create lesson in this course"));
        }
        let lesson = req.body;
        if(!lesson.title){
            return next (new ExpressError(400,"Title is required"));
        }
        if(!lesson.description){
            return next (new ExpressError(400,"description is required"));
        }
        if(!lesson.lessonNumber){
            return next (new ExpressError(400,"lessonNumber is required"));
        }
        if((course.accessLevel === "PREMIUM" ||course.accessLevel==="FREE")&& !lesson.docsUrl){
            return next (new ExpressError(400,"docsUrl is required"));
        }
        if((course.accessLevel === "PREMIUM" ||course.accessLevel==="BASIC")&& !lesson.videoUrl){
            return next (new ExpressError(400,"videoUrl is required"));
        }
        let lessonRegistered = await Lesson.create(lesson);
        course.lesson.push(lessonRegistered._id);
        await course.save();
        if(!lessonRegistered){
            return next (new ExpressError(500,"Something went wrong in registering lesson"));
        }
        res.json({
            success:true,
            message:"Lesson successfully registered",
        })
    }
    catch(err){
        return next (new ExpressError(500,err));
    }
}

export{
    viewAllCourses,
    viewCourse,
    createCourse,
    editRoute,
    deleteCourse,
    enrollUser,
    viewLesson,
    createLesson,
}