import mongoose from "mongoose";



export default async function dbConnect(url) {
    try {
        mongoose.connect(url)
       .then(()=>console.log("MongoDB Connect "))
    } catch (error) {
        console.log("MongoDB Connection Error ", error)
    }
}