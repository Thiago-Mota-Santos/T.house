import type { DeepPartial } from "../../test/deepPartial";
import { getCounter } from "../../test/getCounter";
import { UserModel } from "../user/UserModel";

interface User {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (args: DeepPartial<User> = {}) => {
  const n = getCounter("user");
  const {
    name = `User ${n}`,
    email = `user${n}@test.com`,
    password = `password123${n}321`,
    ...payload
  } = args;

  return new UserModel({
    name,
    email,
    password,
    ...payload,
  }).save();
};
