import type { ParameterizedContext } from "koa";
import { UserModel } from "../modules/user/UserModel";
import { validateUserApi } from "./restUtils";
import { userGetApi } from "./userGet";

export interface User {
  name: string;
  email: string;
  password: string;
}

export const userCreate = async (ctx: ParameterizedContext) => {
  const { user } = ctx.request.body as { user: User };

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      message: "User is required",
    };
    return;
  }

  const { user: userValidated, error } = validateUserApi(user);
  if (error) {
    ctx.status = 400;
    ctx.body = {
      message: error,
    };
    return;
  }

  const { user: userExist } = await userGetApi(undefined, userValidated?.email);

  if (userExist) {
    ctx.status = 400;
    ctx.body = {
      message: "Email already in use",
    };
    return;
  }

  try {
    const userNew = await new UserModel({
      ...userValidated,
    }).save();

    const { user: userNormalized, error } = await userGetApi(userNew._id);

    if (error) {
      ctx.status = 400;
      ctx.body = {
        message: error,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      user: userNormalized,
    };
  } catch (err) {
    console.log("err: ", err);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};
