import type { Next, ParameterizedContext } from "koa";
import jwt from "jsonwebtoken";
import type { User } from "../modules/user/UserModel";
import { UserModel } from "../modules/user/UserModel";
import { config } from "../config";
import type { Base64String } from "./base64";
import { unbase64 } from "./base64";

export interface Token {
  userId: string | null;
}

export const getToken = (authorization: Base64String): Token => {
  const userId = unbase64(authorization);

  if (!userId) {
    return {
      userId: null,
    };
  }

  return {
    userId,
  };
};

export const getUser = async (token: string) => {
  const { userId } = getToken(token);
  if (!userId) {
    return null;
  }

  const user = await UserModel.findOne({
    _id: userId,
    removedAt: null,
  });

  return user;
};

export const auth = async (ctx: ParameterizedContext, next: Next) => {
  const { authorization } = ctx.header;
  console.log(ctx.headers);
  console.log(authorization);

  // console.log(authorization);
  if (!authorization) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized",
    };
    return;
  }

  const user = await getUser(authorization);

  if (!user) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized",
    };
    return;
  }

  ctx.user = user;

  await next();
};

export const generateToken = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `JWT ${jwt.sign({ user: user._id }, config.JWT_SECRET)}`;
};
