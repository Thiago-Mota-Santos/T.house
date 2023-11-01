import type { ParameterizedContext } from "koa";
import { UserModel } from "../modules/user/UserModel";
import { getObjectId } from "../test/getObjectId";

const hasUser = (id?: string, email?: string) => {
  if (id) {
    return {
      error: null,
      userExist: {
        _id: getObjectId(id),
      },
    };
  }

  if (email) {
    return {
      error: null,
      userExist: {
        email,
      },
    };
  }

  return {
    error: "User is invalid",
  };
};

export const userGetApi = async (id?: string, email?: string) => {
  const { error, userExist } = hasUser(id, email);

  if (error) {
    return {
      error,
      user: null,
    };
  }

  const user = await UserModel.findOne({
    ...userExist,
  }).lean();

  if (!user) {
    return {
      error: "User not found",
      user: null,
    };
  }

  return {
    error: null,
    user,
  };
};

export const userGet = async (ctx: ParameterizedContext) => {
  const { id }: { id: string } = ctx.params;

  try {
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "You must provide an id",
      };
      return;
    }

    const { user, error } = await userGetApi(id);

    if (error) {
      ctx.status = 400;
      ctx.body = {
        message: error,
      };

      return;
    }

    ctx.status = 200;
    ctx.body = {
      user,
    };
  } catch (e) {
    console.log("error: ", e);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};
