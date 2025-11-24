import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import {getUser,  setUser } from "../email_verify/auth.js";
import sendVerificationEmail from "../email_verify/email.js";
import { setToken } from "../service/auth.js";
import blacklist from "./util.js";



 async function handelSignUp(req,res) {
    
    try {
        
        const {name,email,password}=req.body

        if(!name || !email || !password){
        return res.status(400).json({message:"Require All Field"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,salt)


        const newUser= await User.create({
            name:name,
            email:email,
            password:hashPassword,
        })
        console.log("user Craete :" ,newUser)
        const token=setUser(newUser)

        await sendVerificationEmail(email,token)
        res.status(202).json({
            status: "success",
            message: "Verification Email Sent",
            token:token
        })

    } catch (error) {
        res.status(500).json({message:"Error Created User",error:error.message});
    }
}


 async function handelEmailVerify(req, res) {
  try {
    const { token } = req.params;

    // Get userId by token
    const userId = await getUser(token);

    if (!userId) {
      return res.status(400).send("Invalid or expired token");
    }

    const user = await User.findById(userId);
    console.log("user before email verify", user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // If already verified, block second attempt
    if (user.isVerified) {
      return res.redirect("http://localhost:5173/login?verified=already");
    }

    // Mark verified
    user.isVerified = true;
    await user.save();

    console.log("user after email verify", user)
    

    return res.redirect("http://localhost:5173/login?verified=success");



  } catch (error) {
    console.error("Verification error:", error.message);
   return res.redirect("http://localhost:5173/login?verified=error");
  }
}


async function handelLogin(req,res) {
  try {
    
    const {email,password}=req.body;

    const newUser = await User.findOne({ email });

    if (!newUser) {
            return res.status(400).json({ message: "Invalid Email" });
        }

    const isMatch = await bcrypt.compare(password, newUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

    if(newUser.isVerified==false){
      return res.status(400).json({message:"Please Verify Email Link"})
    }

    const name = newUser.name;
    const id= newUser._id;
    const token = setToken(newUser);

    return res.status(200).json({
            status:"success",
            name: name,
            userid:id,
            message: "Your login was successful",
            token:token
        });
    
  } catch (error) {
     console.error("Login error:", error.message);
    return res.status(400).send("Error Login ");
  }
}


async function handelLogout(req,res) {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(400).json({ message: "No token provided" });

    blacklist.add(token)

    res.status(200).json({ 
      status:"success",
      message: "Logout successful" 
    });

  } catch (error) {
    es.status(400).json({ message: "Error logout", error: error.message });
  }
}

export {
    handelSignUp,
    handelEmailVerify,
    handelLogin,
    handelLogout
}