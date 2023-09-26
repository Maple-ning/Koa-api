import { Context } from "koa";
import { User } from "../entity/user";
import { AppDataSource } from "../index";

export default class UserController {
  public static async listUsers(ctx: Context) {
    const userReposity = AppDataSource.getRepository(User);
    const users = await userReposity.find();
    ctx.status = 200;
    ctx.body = users;
  }
}
