import { Router } from "express";
import { createCourse, createLesson, deleteCourse, editRoute, enrollUser, viewAllCourses, viewCourse, viewLesson } from "../controllers/course.js";
import isLoggedin from "../middlewares/isLoggedin.js";
const router = Router();

import multer from "multer";
import { storage } from "../config/cloudConfig.js";
const upload = multer({storage});

router.get("/", viewAllCourses); //all courses
router.get("/:id",viewCourse); //view course
router.post("/",isLoggedin,upload.single("thumbnail"),createCourse); //create course
router.put("/:id",isLoggedin,upload.single("thumbnail"), editRoute) //edit course
router.delete("/:id",isLoggedin,deleteCourse) //delete course
router.post("/:id/enroll",isLoggedin,enrollUser) //enroll user

router.post("/:courseid/lessons/:lessonid",isLoggedin,viewLesson) //view lesson

router.post("/:courseid/lessons",isLoggedin,createLesson) //create lesson

export default router;
