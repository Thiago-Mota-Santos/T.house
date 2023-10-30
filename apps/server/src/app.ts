import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import Router from "koa-router";
import cors from "koa-cors";

const app = new Koa();
const router = new Router();


const routerAuth = new Router();

app.use(logger());
app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());

routerAuth.get("/api/user", userGetAll);



// Default not found 404
app.use((ctx) => {
  ctx.status = 404;
});

export default app;