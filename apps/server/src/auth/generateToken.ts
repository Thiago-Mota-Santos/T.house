import jwt from "jsonwebtoken";
import { config } from "../config";
import type { User } from "../modules/user/UserModel";

const JWT_KEY = config.JWT_SECRET;

export const generateToken = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `JWT ${jwt.sign({ id: user._id }, JWT_KEY)}`;
};
