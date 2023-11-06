import type { ParameterizedContext } from "koa";
import type { User } from "../modules/user/UserModel";
import { UserModel } from "../modules/user/UserModel";
import { getObjectId } from "../test/getObjectId";

export const userUpdate = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params as { id: string };
  const { user } = ctx.request.body as { user: User };

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      message: "User not found. Pass the correct id",
    };
    return;
  }

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      message: "user request body is required to update an existing user",
    };
  }

  const findUser = await UserModel.findById(getObjectId(id));

  if (!findUser) {
    ctx.status = 400;
    ctx.body = {
      message: "User not found. Pass the correct id",
    };
    return;
  }

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      getObjectId(id),
      user,
      { new: true },
    );

    console.log(updateUser);

    if (!updateUser) {
      ctx.status = 400;
      ctx.body = {
        message: "Error while deleting user",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "User updated successfully",
      user,
    };
  } catch (err) {
    console.log("err: ", err);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};
