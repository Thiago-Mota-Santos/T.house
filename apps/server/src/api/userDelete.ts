import type { ParameterizedContext } from "koa";
import { UserModel } from "../modules/user/UserModel";
import { getObjectId } from "../test/getObjectId";

export const userDelete = async (ctx: ParameterizedContext) => {
  const { id } = ctx.params;

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      message: "User not found",
    };
    return;
  }
  const user = await UserModel.findById(getObjectId(id));

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      message: "User not found. Pass the correct id",
    };
    return;
  }

  try {
    const deletedUser = await UserModel.findOneAndDelete({ _id: user.id });

    if (!deletedUser) {
      ctx.status = 400;
      ctx.body = {
        message: "Error while deleting user",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "User deleted successfully",
      user: deletedUser,
    };
  } catch (err) {
    console.log("err: ", err);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};
