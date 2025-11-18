import express from "express";
import {handelSignUp,handelEmailVerify, handelLogin, handelLogout} from "../controllers/user.js";
import multer from "multer";
import requiredAuth from "../middileware/auth.js";
const upload=multer()



const  router=express.Router();

router.post("/create",upload.none(),handelSignUp);
router.get("/verify/:token",handelEmailVerify)
router.get("/login",upload.none(),handelLogin)
router.get("/logout",handelLogout)

export default router