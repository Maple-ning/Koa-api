import { User } from "../entity/user";

export const mysqlLogin = {
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Ning99..",
  database: "koa1",
  entities: [User],
  synchronise: true,
  logging: false,
};
