import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import cors from "cors";
import { connectDb } from "./db/db";
import { userRouter } from "./routes/UserRoutes";
import { companyModel } from "./Entities/CompanySchema";
import { UserModel } from "./Entities/UserSchema";
import { companyRouter } from "./routes/CompanyRoutes";
import { productRoutes } from "./routes/ProductRoutes";
import { dashboardRouter } from "./routes/DashboardRoutes";
import { authMiddleware } from "./middlewares/AuthMiddleware";

const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/company", [authMiddleware], companyRouter);
app.use("/product", [authMiddleware], productRoutes);
app.use("/dashboard", [authMiddleware], dashboardRouter);

app.listen(process.env.PORT || 8000, () => {
  connectDb();
  console.log("server is running");
});
