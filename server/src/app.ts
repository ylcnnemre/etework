import express,{Express} from "express"
import dotenv from "dotenv"
import "reflect-metadata";
import cors from "cors"
import { connectDb } from "./Infrastructrue/Ete.persistence/db/db"
import { userRouter } from "./Api/routes/UserRoutes"
import { UserManager } from "./Test/UserManager"
import { container } from "./Test/inversify.config";
import { INotificationService } from "./Test/Notificate";

const app:Express=express()
dotenv.config()
app.use(cors())

app.get("/",(req,res)=>{

        res.send("asdasd")
})




app.listen(process.env.PORT || 8000 , () =>{
    connectDb()
    console.log("server is running")
} )