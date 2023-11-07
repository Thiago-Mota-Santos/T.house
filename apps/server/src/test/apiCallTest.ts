import request from "supertest";
import app from "../app";

interface ApiArgs {
  url: string | null;
  authorization: string | null;
  payload: object | null;
  domain?: string | null;
}

export async function apiCallTestCreate(args: ApiArgs) {
  const { url, payload: body, authorization } = args;

  if (!url) return;

  const payload = {
    ...body,
  };

  const response = await request(app.callback())
    .post(url)
    .set({
      Accept: "application/json",
      "Content-Type": "application/json",
    })
    .set("Cookie", [`authToken=${authorization}`])
    .send(JSON.stringify(payload));

  return response;
}
