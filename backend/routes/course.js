import { Router } from "express";
import { createCourse, viewAllCourses, viewCourse } from "../controllers/course.js";
import isLoggedin from "../middlewares/isLoggedin.js";
const router = Router();

import multer from "multer";
import { storage } from "../config/cloudConfig.js";
const upload = multer({storage});

router.get("/", viewAllCourses); //all courses
router.get("/:id",viewCourse); //view course
router.post("/",isLoggedin,upload.single("thumbnail"),createCourse); //create course
// router.put("/:id") //edit course
// router.delete("/:id") //delete course
// router.post("/:id/enroll") //enroll user

// router.post("/:courseid/lessons/:lessonid") //view lesson

export default router;
