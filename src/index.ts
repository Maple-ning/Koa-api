import { NodeErrorParams } from "./types/error";
import { mysqlLogin } from "./db/config";
import { DataSource } from "typeorm";

const Koa = require("koa");
const app = new Koa();
const { koaBody } = require("koa-body");
const error = require("koa-json-error");
const userRouter = require("./router/user");

const AppDataSource = new DataSource({
  ...mysqlLogin,
  type: "mysql",
});

AppDataSource.initialize().then(() => {
  app.use(userRouter.routes());
  app.use(koaBody());
  app.use(
    error((err: NodeErrorParams) => {
      return {
        status: err.status,
        message: err.message,
      };
    })
  );
  app.listen(1314, () => {
    console.log("server is running at http://localhost:1314");
  });
}).catch((err)=>{
  console.log(err);
});

export { AppDataSource };
