import type { ParameterizedContext } from "koa";
import { UserModel } from "../modules/user/UserModel";

export const userGetAll = async (ctx: ParameterizedContext): Promise<void> => {
  try {
    const users = await UserModel.find({
      removedAt: null,
    }).lean();

    ctx.status = 200;
    ctx.body = {
      users,
    };
  } catch (err) {
    console.log("err: ", err);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};
