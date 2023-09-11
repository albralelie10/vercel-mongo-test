import express from "express";
import router from "../routes/routes"

function createServer(){
    const app=express()
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use("/api/v1",router)
    return app
}

export default createServer;
