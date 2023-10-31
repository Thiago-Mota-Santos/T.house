import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import cors from "kcors";
import Router from "koa-router";
import { userGetAll } from "./api/userGetAll";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(logger());
app.use(cors({ credentials: true }));

router.get("/api/user", userGetAll);

// Default not found 404
app.use((ctx) => {
  ctx.status = 404;
});

export default app;
