import type { Next, ParameterizedContext } from "koa";
import { UserModel } from "../modules/user/UserModel";
import { getObjectId } from "../test/getObjectId";
import { unbase64, type Base64String } from "./base64";

interface Token {
  userId: string | null;
}

export const getToken = (auth: Base64String): Token => {
  const userId = unbase64(auth);

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
    _id: getObjectId(userId),
    removedAt: null,
  });

  return user;
};

export const auth = async (ctx: ParameterizedContext, next: Next) => {
  const { authorization } = ctx.header as { authorization: string };

  if (!authorization) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized",
    };

    const user = await getUser(authorization);

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        message: "Unauthorized",
      };
    }

    ctx.user = user;

    await next();
  }
};
