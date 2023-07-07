import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import cors from "cors";
import { connectDb } from "./db/db";
import { userRouter } from "./routes/UserRoutes";
import { companyModel } from "./Entities/CompanySchema";
import { UserModel } from "./Entities/UserSchema";

const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get("/company",async (req, res) => {
  await UserModel.create({
    email : "abc@gmail.com",
    username : "abc",
    password : "aasdasd"
  })
  res.send("aaas")
});

app.listen(process.env.PORT || 8000, () => {
  connectDb();
  console.log("server is running");
});
