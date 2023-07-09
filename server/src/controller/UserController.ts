import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { registerValidator } from "../Validators/RegisterValidator";
import { LoginValidator } from "../Validators/LoginValidator";
import { ValidationError } from "joi";
import jwt from "jsonwebtoken";

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.newUser = this.newUser.bind(this);
    this.login = this.login.bind(this);
  }

  private errorFormat(error: ValidationError) {
    return error.details.map((item) => {
      return {
        type: item.context.label,
        msg: item.message,
      };
    });
  }

  async newUser(req: Request, res: Response) {
    const { error, value } = registerValidator.validate(req.body);
    if (error) {
      let errors = this.errorFormat(error);
      return res.status(400).send(errors);
    }
    const { confirmPassword, ...rest } = req.body;
    let sonuc = await this.userService.addUser(rest);

    res.send(sonuc);
  }

  async login(req: Request, res: Response) {
    const { error, value } = LoginValidator.validate(req.body);
    if (error) {
      let result = this.errorFormat(error);
      console.log("error =>", result);
      return res.status(400).send(result);
    }
    try {
      let data = await this.userService.loginUser({
        ...req.body,
      });

      res.send(data);
    } catch (err) {
      res.status(401).json({
        success: false,
        msg: err.message,
      });
    }
  }

  async validateToken(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      console.log("hea ==>", req.headers);
      const token = authorization.split(" ")[1];

      const decotedToken = jwt.verify(token, process.env.Secret_key);

      return res.json({
        success: true,
        value: decotedToken,
      });
    } catch (err) {
      return res.json({
        success: false,
        value: err.message,
      });
    }
  }
}

export { UserController };
