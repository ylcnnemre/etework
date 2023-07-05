import { UserModel } from "../../Core/Ete.Domain/Entities/UserSchema";



class UserController {
  async newUser() {

   await UserModel.create({
      username  : "emre",
      email : "email",
      password : "12312",
      phone : 50505
    })

  }
}

export { UserController };
