import express, { json, Router } from 'express'
import config from './config.js'
import dbConnect from './src/connection/connect.js'
import router from './src/routes/router.js'
import bodyParser from 'body-parser'
import cors from 'cors';
import errorHandler from './src/middileware/error.middleware.js';

const app=express()
const port=config.port

dbConnect(config.mongoUrl)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}
));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(errorHandler);


app.use("/user",router)



app.listen(port,()=>{console.log("Server Started Port : ",port)})