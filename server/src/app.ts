import express,{Express} from "express"
import dotenv from "dotenv"
import "reflect-metadata";
import cors from "cors"
import { connectDb } from "./Infrastructrue/Ete.persistence/db/db"
import { userRouter } from "./Api/routes/UserRoutes";

const app:Express=express()
dotenv.config()
app.use(cors())
app.use(express.json())


app.use("/user",userRouter)

app.get("/test",(req,res)=>{
    res.send("merhabaalarrr")
})


app.listen(process.env.PORT || 8000 , () =>{
    connectDb()
    console.log("server is running")
} )