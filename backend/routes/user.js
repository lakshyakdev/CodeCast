import { Router } from "express";
import { adminRegister, loginUser, logout, register, userProfile } from "../controllers/user.js";
import isLoggedin from "../middlewares/isLoggedin.js";

import multer from "multer";
import { storage } from "../config/cloudConfig.js";
const upload = multer({storage});

const router = Router();

router.post("/register",upload.single("avatar"),register);

router.post("/login",loginUser);

router.get("/logout",isLoggedin,logout);

router.get("/profile",userProfile);

router.post("/admin/register/:id",upload.single("avatar"), adminRegister);

export default router;