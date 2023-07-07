import express from "express";
import { UserController } from "../controller/UserController";

const userController: UserController = new UserController();
const userRouter = express.Router();

userRouter.post("/save", userController.newUser);
userRouter.post("/login", userController.login);

export { userRouter };
