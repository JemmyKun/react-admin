const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const path = require("path");
const logger = require("koa-logger");
const bodyparser = require("koa-bodyparser");
const respond = require("koa-respond");
const helmet = require("koa-helmet");

const app = new Koa();
const router = new Router();
const port = process.env.PORT || "8080";
const staticPath = path.join(process.cwd(), "../client/build");
const Apis = require("./apis/index");
Apis(router);

app
  .use(helmet())
  .use(respond())
  .use(bodyparser())
  .use(logger())
  .use(router.allowedMethods())
  .use(router.routes())
  .use(static(staticPath))
  .listen(port, () => {
    console.log("hello koa! port:", port);
  });
