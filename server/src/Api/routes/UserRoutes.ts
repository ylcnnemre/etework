import express from "express";
import { UserController } from "../controller/UserController";

const userController: UserController = new UserController();
const userRouter = express.Router();

userRouter.get("/save", userController.newUser);



export { userRouter };
