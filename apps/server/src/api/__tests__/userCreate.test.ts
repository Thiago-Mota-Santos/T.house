/* eslint-disable no-undef */
import { generateToken } from "../../auth/auth";
import { createUser } from "../../modules/fixtures/createUser";
import { apiCallTestCreate } from "../../test/apiCallTest";
import { clearDbAndRestartCounters } from "../../test/clearDatabase";
import { connectMongoose } from "../../test/connectMongoose";
import { disconnectMongoose } from "../../test/disconnectMoongose";
import { sanitizeTestObject } from "../../test/sanitizeTestObject";

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

const url = "/api/user";

it("should return error if header is not set", async () => {
  const response = await apiCallTestCreate({
    url,
    payload: {},
    authorization: null,
  });
  expect(response?.status).toBe(500);
  expect(response?.body.message).toBe("Some error occurred");
  expect(response?.body).toMatchSnapshot();
});

it("should return error if user name it was not passed", async () => {
  const user = await createUser({});
  const authorization = generateToken(user);

  const userBody = { email: "test@test.com", password: "123456" };
  const response = await apiCallTestCreate({
    url,
    payload: { userBody },
    authorization,
  });

  expect(response?.status).toBe(400);
  expect(response?.body.message).toBe("User is required");
  expect(response?.body).toMatchSnapshot();
});

it("should return error if user email it was not passed", async () => {
  const user = await createUser({});
  const authorization = generateToken(user);
  const userBoby = { name: "test@test.com", password: "123456" };
  const response = await apiCallTestCreate({
    url,
    payload: { userBoby },
    authorization,
  });

  expect(response?.status).toBe(400);
  expect(response?.body.message).toBe("User is required");
  expect(response?.body).toMatchSnapshot();
});

it("should return error if user password it was not passed", async () => {
  const user = await createUser({});
  const authorization = generateToken(user);

  const userBody = { name: "test", email: "test@test.com" };
  const response = await apiCallTestCreate({
    url,
    payload: { userBody },
    authorization,
  });

  expect(response?.status).toBe(400);
  expect(response?.body.message).toBe("User is required");
  expect(response?.body).toMatchSnapshot();
});

it("should create user with success", async () => {
  const userCreate = await createUser({});
  const authorization = generateToken(userCreate);
  const user = {
    name: "User 21",
    email: "user2@test.com",
    password: "123456",
  };
  const response = await apiCallTestCreate({
    url,
    payload: { user },
    authorization,
  });

  expect(response?.status).toBe(200);
  expect(response?.body.user.name).toBe(user.name);
  expect(response?.body.user.email).toBe(user.email);
  expect(sanitizeTestObject(response?.body)).toMatchSnapshot();
});
