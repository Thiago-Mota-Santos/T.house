import type { ParameterizedContext } from "koa";
import { UserModel } from "../../modules/user/UserModel";
import { generateToken } from "../../auth/auth";

interface UserBody {
  email: string;
  password: string;
}

export const loginAuth = async (ctx: ParameterizedContext) => {
  const { email, password } = ctx.request.body as UserBody;
  if (!email || !password) {
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };

    return;
  }

  const user = await UserModel.findOne({
    email,
    removedAt: null,
  });

  if (!user) {
    console.log("has user");
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };
  }

  let correctPassword;

  try {
    correctPassword = user?.authenticate(password);
  } catch {
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };

    return;
  }

  if (!correctPassword) {
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };

    return;
  }

  ctx.status = 200;
  ctx.body = {
    message: "User authenticated sucessfully",
    token: generateToken(user),
  };
};
