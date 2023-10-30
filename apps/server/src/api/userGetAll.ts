import UserModel from "../modules/user/UserModel";

export const userGetAll = async (ctx) => {
  try {
    const users = await UserModel.find({
      removedAt: null,
    })
      .lean();


    ctx.status = 200;
    ctx.body = {
      users,
    };
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};