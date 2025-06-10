import { Router } from "express";
import { loginUser, logout, register } from "../controllers/user";

const router = Router();

router.post("/register",register);

router.post("/login",loginUser);

router.get("/logout",logout);