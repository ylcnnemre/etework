import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    console.log("hea ==>",req.headers)
    const token = authorization.split(" ")[1];

    const decotedToken = jwt.verify(token, process.env.Secret_key);


    next()

  } catch (err) {
    return res.status(401).json({
      success: false,
      value: err.message,
    });
  }
};
