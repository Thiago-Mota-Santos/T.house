import { createUser } from "../modules/fixtures/createUser";
import { connectMongo } from "../connectMongo";
import { UserModel } from "../modules/user/UserModel";

declare const global: {
  __COUNTERS__: Record<string, number>;
};

global.__COUNTERS__ = {
  user: 0,
};

const seedUsers = async () => {
  const { name, email, password } = await createUser();

  const u = new UserModel({
    name,
    email,
    password,
  });

  console.log("user created", u);
};

void (async () => {
  try {
    await connectMongo();
    await seedUsers();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
  }

  process.exit(0);
})();
