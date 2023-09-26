import { User } from "../entity/user";

export const mysqlLogin = {
  host: "127.0.0.1",
  port: 3306,
  username: "用户名",
  password: "密码",
  database: "库名称",
  entities: [User],
  synchronise: true,
  logging: false,
};
