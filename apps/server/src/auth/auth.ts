import type { Next, ParameterizedContext } from "koa";
import jwt from "jsonwebtoken";
import type { User } from "../modules/user/UserModel";
import { UserModel } from "../modules/user/UserModel";
import { config } from "../config";

export const auth = async (ctx: ParameterizedContext, next: Next) => {
  const token = ctx.cookies.get("authToken");

  if (!token) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized",
    };
    return;
  }

  try {
    const subToken = token.replace("JWT ", "");
    const decodedToken = jwt.verify(subToken, config.JWT_SECRET);
    const decodedId = decodedToken as unknown as { user: string };

    const user = await UserModel.findOne({ _id: decodedId.user });
    console.log(user);
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        message: "Unauthorized",
      };
      return;
    }

    ctx.user = user;

    await next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      message: "Some error occurred",
    };
  }
};

export const generateToken = (user: User) => {
  return `JWT ${jwt.sign({ user: user._id }, config.JWT_SECRET)}`;
};
