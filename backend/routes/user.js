import { Router } from "express";
import { loginUser, logout, register, userProfile } from "../controllers/user";
import isLoggedin from "../middlewares/isLoggedin";

const router = Router();

router.post("/register",register);

router.post("/login",loginUser);

router.get("/logout",isLoggedin,logout);

router.get("/profile",userProfile);