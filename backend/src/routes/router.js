import express from "express";
import {handelSignUp,handelEmailVerify, handelLogin, handelLogout} from "../controllers/user.js";
import multer from "multer";
const upload=multer()



const  router=express.Router();

router.post("/create",upload.none(),handelSignUp);
router.get("/verify/:token",handelEmailVerify)
router.post("/login",upload.none(),handelLogin)
router.post ("/logout",handelLogout)

export default router