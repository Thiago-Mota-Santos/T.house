import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import Router from "koa-router";
import cors from "kcors";
import { userCreate } from "./api/userCreate";
import { userGetAll } from "./api/userGetAll";
import { auth } from "./auth/auth";
import { loginAuth } from "./api/auth/loginAuth";
import { userDelete } from "./api/userDelete";
import { userGet } from "./api/userGet";

const app = new Koa();

const routerAuth = new Router();
const routerOpen = new Router();

app.use(logger());
app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());

routerOpen.get("/api/version", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "OK",
  };
});

routerOpen.post("/api/auth/login", loginAuth);

app.use(routerOpen.routes());

routerAuth.use(auth);

routerAuth.get("/api/user/:id", userGet);
routerAuth.delete("/api/user/:id", userDelete);
routerAuth.post("/api/user", userCreate);
routerAuth.get("/api/user", userGetAll);

app.use(routerAuth.routes());

app.use((ctx) => {
  ctx.status = 404;
});

export default app;
