import express from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const userController: UserController = new UserController();
const userRouter = express.Router();

userRouter.post("/save", userController.newUser);
userRouter.post("/login", userController.login);
userRouter.get("/validate",userController.validateToken)
export { userRouter };
