import { UserClassModel, UserModel } from "../Entities/UserSchema";
import jwt from "jsonwebtoken";

export class UserService {
  async addUser(item: Partial<UserClassModel>) {
    try {
      const { username, password, email } = item;
      const newUser = new UserModel({ username, password, email });
      await newUser.save();
      return {
        success: true,
        msg: "success",
      };
    } catch (error) {
      console.error("Hata:", error);
      return {
        success: false,
        msg: error.message,
      };
    }
  }

  async deleteById(id: string) {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Hata:", error);
      return false;
    }
  }

  async updateUser(
    id: string,
    updatedData: Partial<UserClassModel>
  ): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return !!result;
    } catch (error) {
      console.error("Hata:", error);
      return false;
    }
  }

  async loginUser(
    item: Partial<UserClassModel>
  ): Promise<{ success: boolean; msg?: string; token?: string }> {
    const user = await UserModel.findOne({
      $or: [{ username: item.username }, { email: item.username }],
    });
    if (!user) {
      throw new Error("user not found");
    }
    if (user.password !== item.password) {
      throw new Error("password wrong");
    }
    const token = jwt.sign(
      { username: user.username },
      process.env.Secret_key ?? "test",
      { expiresIn: "1h" }
    );
    return {
      success: true,
      token: token,
    };
  }
}
