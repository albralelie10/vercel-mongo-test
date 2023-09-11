import  { Request, Response } from "express"
const PORT=3000||process.env.PORT
import {connectionDB} from "./src/db/connection"
import dotenv from "dotenv"
import createServer from "./src/utils/server"
dotenv.config()

const app=createServer()

app.get("/",(req:Request,res:Response)=>{
    return res.send("Home page")
})


const start=async()=>{
    try{
        if(process.env.MONGO_URI){
            await connectionDB(process.env.MONGO_URI)
        }        
        app.listen(PORT,()=>console.log("SERVER RUNNING"))
    }catch(err){
        console.log(err)
    }
}

start()

export default app;

